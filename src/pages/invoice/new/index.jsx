/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TestList from "./TestList";
import InvoiceData from "./InvoiceData";
import PatientData from "./PatientData";
import Modal from "../../../components/modal";
import { testList, referrerList } from "../../../data";

const CreateInvoice = () => {
  const [checkedTest, setCheckedTest] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    total: 0,
    hasDiscount: false,
    discountType: null,
    referrer: null,
    discount: 0,
    afterDiscount: 0,
    labAdjustment: 0,
    netAmount: 0,
    paid: 0,
  });
  const [patientData, setPatientData] = useState({ name: "", age: "", contact: "", doctorName: "" });
  const { total, hasDiscount, discountType, discount, labAdjustment } = invoiceData;
  const [loadingState, setLoadingState] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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
    if (hasDiscount) {
      if (discountType === "fixed") {
        afterDiscount = total - discount;
      } else {
        afterDiscount = total - (discount * total) / 100;
      }
      netAmount = afterDiscount - labAdjustment;
      setInvoiceData({ ...invoiceData, afterDiscount, netAmount });
    } else {
      netAmount = total - labAdjustment;
      afterDiscount = total;
      setInvoiceData({ ...invoiceData, afterDiscount, netAmount });
    }
  }, [total, hasDiscount, discount, discountType, labAdjustment]);

  const handleHasDiscount = (val) => {
    if (val) {
      setInvoiceData({ ...invoiceData, hasDiscount: true, discount: invoiceData.referrer.discountAmount });
    } else {
      setInvoiceData({ ...invoiceData, hasDiscount: false, discount: 0 });
    }
  };

  const handleDiscount = (value, referrer) => {
    if (value > referrer.discountAmount) {
      setInvoiceData({ ...invoiceData, discount: referrer.discountAmount });
    } else {
      setInvoiceData({ ...invoiceData, discount: value });
    }
  };

  const handleReferrer = (val) => {
    const referrer = JSON.parse(val);
    setInvoiceData((state) => {
      return { ...state, discountType: referrer.type, referrer };
    });
    console.log(invoiceData);
    if (referrer.isDoctor) {
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
      setLoadingState("error");
      setMsg("ল্যাব টেস্ট সিলেক্ট করুন");
      return;
    }
    if (!invoiceData.referrer) {
      setLoadingState("error");
      setMsg("রেফারেন্সকারী সিলেক্ট করুন");
      return;
    }
    if (!patientData.gender) {
      setLoadingState("error");
      setMsg("রোগীর Gender সিলেক্ট করুন");
      return;
    }
    try {
      const pData = {
        name: patientData.name,
        age: patientData.age,
        gender: patientData.gender,
        contact: patientData.contact,
        doctorName: patientData.doctorName,
      };
      const iData = {
        total: invoiceData.total,
        netAmount: invoiceData.netAmount,
        referrerId: invoiceData.referrer.id,
        hasDiscount: invoiceData.hasDiscount,
        discount: invoiceData.discount,
        discountType: invoiceData.discountType,
        paid: invoiceData.paid,
        labAdjustment: invoiceData.labAdjustment,
        testList: checkedTest,
      };
      setLoadingState("sendingData");
      setMsg("Invoice তৈরি হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন....");
      const response = await axios.post("http://localhost:3000/api/v1/invoice/new", {
        patientData: pData,
        invoiceData: iData,
      });
      if (response.data.success) {
        setLoadingState(null);
        setMsg(null);
        console.log(response.data);
        navigate("/invoice/print", {
          state: {
            patientData: pData,
            invoiceData: iData,
            invoiceId: response.data.invoiceId,
            date: response.data.date,
            successMsg: "ইনভয়েসটি তৈরি হয়েছে। ইনভয়েসটি প্রিন্ট করতে নিচের বাটনে ক্লিক করুন"
          },
        });
      }
    } catch (e) {
      setLoadingState("error");
      setMsg(
        "ইনভয়েস তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পেইজটি রিফ্রেশ করে পুনরায় চেষ্টা করুন। বারবার একই সমস্যা দেখা দিলে আমাদের সাথে যোগাযোগ করুন 01910121929 এই নাম্বারে"
      );
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(e);
      }
    }
  };
  const closeModal = () => {
    setLoadingState(null);
    setMsg("");
  };

  return (
    <section className="flex mx-auto w-full">
      {loadingState == "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {loadingState == "sendingData" && <Modal type="processing" title={msg} />}
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
