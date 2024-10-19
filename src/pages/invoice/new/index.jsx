/** @format */

import { useEffect, useState } from "react";
import axios from "axios";

import TestList from "./TestList";
import InvoiceData from "./InvoiceData";
import PatientData from "./PatientData";
import ErrorModal from "../../../components/errorModal";
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
    adjustment: 0,
    netAmount: 0,
    paid: 0,
  });
  const [patientData, setPatientData] = useState({ name: "", age: "", contact: "", doctorName: "" });
  const { total, hasDiscount, discountType, discount, adjustment } = invoiceData;
  const [loadingState, setLoadingState] = useState(null);
  const [errMsg, setErrMsg] = useState("");
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
      netAmount = afterDiscount - adjustment;
      setInvoiceData({ ...invoiceData, afterDiscount, netAmount });
    } else {
      netAmount = total - adjustment;
      afterDiscount = total;
      setInvoiceData({ ...invoiceData, afterDiscount, netAmount });
    }
  }, [total, hasDiscount, discount, discountType, adjustment]);

  const handleHasDiscount = (val) => {
    if (val) {
      setInvoiceData({ ...invoiceData, hasDiscount: true });
    } else {
      setInvoiceData({ ...invoiceData, discount: 0, hasDiscount: false });
    }
  };

  const handleDiscount = (value, referrer) => {
    if (value > referrer.amount) {
      setInvoiceData({ ...invoiceData, discount: referrer.amount });
    } else {
      setInvoiceData({ ...invoiceData, discount: value });
    }
  };

  const handleReferrer = (val) => {
    const referrer = JSON.parse(val);
    setInvoiceData({ ...invoiceData, discountType: referrer.type, referrer, discount: referrer.amount });
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
      setErrMsg("ল্যাব টেস্ট সিলেক্ট করুন");
      return;
    }
    if (!invoiceData.referrer) {
      setLoadingState("error");
      setErrMsg("রেফারেন্সকারী সিলেক্ট করুন");
      return;
    }
    if (!patientData.gender) {
      setLoadingState("error");
      setErrMsg("রোগীর Gender সিলেক্ট করুন");
      return;
    }
    console.log("handleSubmit called");
    try {
      const pData = {
        name: patientData.name,
        age: patientData.age,
        gender: patientData.gender,
        contact: patientData.contact,
        doctorName: patientData.doctorName,
      };
      const iData = {
        referrerId: invoiceData.referrer.id,
        total: invoiceData.total,
        discount: invoiceData.discount,
        paid: invoiceData.paid,
        testList: checkedTest,
      };
      console.log(iData);
      const response = await axios.post("http://localhost:3000/api/v1/invoice/new", {
        patientData: pData,
        invoiceData: iData,
      });
      if (response.data.success) {
        console.log("data added");
        console.log(response.data);
        navigate("/invoice/print");
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(e);
      }
    }
  };
  const closeModal = () => {
    setLoadingState(null);
    setErrMsg("");
  };

  return (
    <section className="flex mx-auto w-full">
      {loadingState == "error" && <ErrorModal title={errMsg} onClose={closeModal} />}
      <form onSubmit={handleSubmit}>
        <div className="w-full mx-20">
          <PatientData
            data={patientData}
            referrerList={referrerList}
            onChange={handlePatientData}
            onReferrer={handleReferrer}
          />
        </div>

        <div className="w-full mx-20 py-4">
          <TestList list={testList} onChange={handleCheckedTest} />
        </div>

        <div className="w-2/3 mx-auto">
          <InvoiceData
            data={invoiceData}
            onPay={(value) => setInvoiceData({ ...invoiceData, paid: value })}
            handleHasDiscount={handleHasDiscount}
            onDiscount={handleDiscount}
            onAdjustment={(value) => setInvoiceData({ ...invoiceData, adjustment: parseFloat(value) })}
          />
        </div>
        <div className="w-2/3 mx-auto py-4 flex justify-center items-center gap-10">
          <button type="submit" className="btn">
            Create Invoice
          </button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </section>
  );
};

export default CreateInvoice;
