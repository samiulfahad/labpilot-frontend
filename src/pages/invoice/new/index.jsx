/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TestList from "./TestList";
import InvoiceData from "./InvoiceData";
import PatientData from "./PatientData";
import Modal from "../../../components/modal";
import { API_URL } from "../../../../config";

const CreateInvoice = () => {
  const [testList, setTestList] = useState([]);
  const [referrerList, setReferrerList] = useState([]);
  const [checkedTest, setCheckedTest] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    total: 0,
    hasDiscount: false,
    referrer: { _id: null, commission: "", commissionType: "" },
    discount: 0,
    afterDiscount: 0,
    labAdjustment: 0,
    netAmount: 0,
    paid: 0,
    commission: 0,
  });
  const [patientData, setPatientData] = useState({ name: "", age: "", contact: "", doctorName: "" });

  const { total, referrer, hasDiscount, discount, labAdjustment } = invoiceData;
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("processing");
        setMsg("Loading Data. Please wait...");
        const response = await axios.get(API_URL + "/api/v1/user/dataForNewInvoice");
        if (response.data.success) {
          setTestList(response.data.testList);
          setReferrerList(response.data.referrerList);
          setStatus(null);
          setMsg(null);
        } else {
          setStatus("error");
          setMsg("একটি সমস্যা হয়েছে। দয়া করে পেইজটি Refresh/Reload করে পুনরায় চেষ্টা করুন।");
        }
      } catch (e) {
        setStatus("error");
        setMsg("একটি সমস্যা হয়েছে। দয়া করে পেইজটি Refresh/Reload করে পুনরায় চেষ্টা করুন।");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let totalAmount = 0;
    checkedTest.forEach((item) => {
      totalAmount = totalAmount + item.price;
    });
    setInvoiceData({ ...invoiceData, total: totalAmount });
  }, [checkedTest]);

  useEffect(() => {
    let afterDiscount;
    let netAmount;
    let referrerCommission;
    if (hasDiscount) {
      if (referrer.commissionType === "fixed") {
        afterDiscount = total - discount;
        referrerCommission = referrer.commission - discount;
      } else {
        afterDiscount = total - (discount * total) / 100;

        referrerCommission = ((referrer.commission - discount) * total) / 100;
      }
      netAmount = afterDiscount - labAdjustment;
      setInvoiceData({ ...invoiceData, afterDiscount, netAmount, commission: referrerCommission });
    } else {
      if (referrer.commissionType === "fixed") {
        referrerCommission = referrer.commission;
      } else {
        referrerCommission = parseFloat(referrer.commission * total) / 100;
      }
      netAmount = total - labAdjustment;
      afterDiscount = total;
      setInvoiceData({ ...invoiceData, afterDiscount, netAmount, commission: referrerCommission });
    }
  }, [total, hasDiscount, discount, referrer, labAdjustment]);

  const handleHasDiscount = (val) => {
    if (val === true) {
      setInvoiceData({ ...invoiceData, hasDiscount: true, discount: parseFloat(invoiceData.referrer.commission) });
    } else {
      setInvoiceData({ ...invoiceData, hasDiscount: false, discount: 0 });
    }
  };

  const handleDiscount = (value, referrer) => {
    if (value > referrer.commission) {
      setInvoiceData({ ...invoiceData, discount: parseFloat(referrer.commission) });
    } else {
      setInvoiceData({ ...invoiceData, discount: parseFloat(value) });
    }
  };

  const handleReferrer = (e) => {
    // console.log(e.target.value)
    const referrer = JSON.parse(e.target.value);
    setInvoiceData((prev) => ({ ...prev, referrer }));
    if (referrer.isDoctor === "yes") {
      setPatientData({ ...patientData, doctorName: referrer.name });
    }
  };

  const handleCheckedTest = (test) => {
    if (!checkedTest.some((item) => item.name === test.name)) {
      setCheckedTest([...checkedTest, test]);
    } else {
      const updated = checkedTest.filter((item) => item.name !== test.name);
      setCheckedTest(updated);
    }
  };
  const handlePatientData = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkedTest.length === 0) {
      setStatus("error");
      setMsg("ল্যাব টেস্ট সিলেক্ট করুন");
      return;
    }
    // if (!invoiceData.referrer) {
    //   setStatus("error");
    //   setMsg("রেফারেন্সকারী সিলেক্ট করুন");
    //   return;
    // }
    // if (!patientData.gender) {
    //   setStatus("error");
    //   setMsg("রোগীর Gender সিলেক্ট করুন");
    //   return;
    // }
    try {
      const pData = {
        name: patientData.name,
        age: patientData.age,
        gender: patientData.gender,
        contact: patientData.contact,
        doctorName: patientData.doctorName,
      };

      let discountAmount = 0;
      if (hasDiscount) {
        if (invoiceData.referrer.commissionType === "percentage") {
          discountAmount = (invoiceData.total * discount)/100
        } else {
          discountAmount = invoiceData.discount
        }
      }

      const iData = {
        total: invoiceData.total,
        netAmount: invoiceData.netAmount,
        referrerId: invoiceData.referrer._id,
        discount: discountAmount,
        paid: invoiceData.paid,
        labAdjustment: invoiceData.labAdjustment,
        commission: invoiceData.commission,
        testList: checkedTest,
      };
      // console.log(iData);
      // return;
      setStatus("processing");
      setMsg("Invoice তৈরি হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন....");
      const response = await axios.post(API_URL + "/api/v1/invoice/new", {
        patientData: pData,
        invoiceData: iData,
      });
      if (response.data.success) {
        setStatus(null);
        setMsg(null);
        console.log(response.data);
        navigate("/invoice/print", {
          state: {
            patientData: pData,
            invoiceData: { ...iData, invoiceId: response.data.invoiceId },
            successMsg: "ইনভয়েসটি তৈরি হয়েছে। ইনভয়েসটি প্রিন্ট করতে নিচের বাটনে ক্লিক করুন",
          },
        });
      }
    } catch (e) {
      setStatus("error");
      setMsg("ইনভয়েস তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পেইজটি রিফ্রেশ করে পুনরায় চেষ্টা করুন।");
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(e);
      }
    }
  };
  const closeModal = () => {
    setStatus(null);
    setMsg("");
  };

  return (
    <section className="flex mx-auto w-full">
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {status === "processing" && <Modal type="processing" title={msg} />}
      <form onSubmit={handleSubmit}>
        <div className="w-full pl-20">
          <PatientData
            data={patientData}
            referrerList={referrerList}
            onChange={handlePatientData}
            onAddingReferrer={handleReferrer}
          />
        </div>

        <div className="w-full pl-20 py-4">
          <TestList list={testList} onChange={handleCheckedTest} />
        </div>

        <div className="w-2/3 mx-auto">
          <InvoiceData
            data={invoiceData}
            onPay={(value) => setInvoiceData({ ...invoiceData, paid: value })}
            handleHasDiscount={handleHasDiscount}
            onDiscount={handleDiscount}
            onLabAdjustment={(value) => setInvoiceData({ ...invoiceData, labAdjustment: parseFloat(value) })}
          />
        </div>
        <div className="w-2/3 mx-auto py-4 flex justify-center items-center gap-10">
          <button type="submit" className="btn">
            Create Invoice
          </button>
          <Link className="btn" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateInvoice;
