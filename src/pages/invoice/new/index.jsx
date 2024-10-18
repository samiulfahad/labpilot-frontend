/** @format */

import { useEffect, useState } from "react";

import TestList from "./TestList";
import InvoiceData from "./InvoiceData";
import PatientData from "./PatientData";
import ErrorModal from "../../../components/errorModal";
import { useNavigate } from "react-router-dom";
import { testList, referrerList } from "../../../data";

const CreateInvoice = () => {
  const [checkedTest, setCheckedTest] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    total: 0,
    hasDiscount: false,
    discountType: null,
    maximumDiscount: null,
    discount: 0,
    afterDiscount: 0,
    adjustment: 0,
    netAmount: 0,
    paid: 0,
  });
  const [patientData, setPatientData] = useState({ name: "", age: "", contact: "", referrer: {}, doctorName: "" });

  const { total, discountType, discount, adjustment } = invoiceData;

  const [loadingState, setLoadingState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let totalAmount = 0;
    checkedTest.forEach((item) => {
      totalAmount = totalAmount + item.price;
    });
    setInvoiceData({ ...invoiceData, total: totalAmount });
    console.log(invoiceData);
  }, [checkedTest]);

  useEffect(() => {
    let afterDiscount;
    if (discountType === "fixed") {
      afterDiscount = total - discount;
    } else {
      afterDiscount = total - (discount * total) / 100;
    }
    const netAmount = afterDiscount - adjustment;
    setInvoiceData({ ...invoiceData, afterDiscount, netAmount });
  }, [total, discount, discountType, adjustment]);

  const handleHasDiscount = (val) => {
    if (val) {
      setInvoiceData({ ...invoiceData, hasDiscount: true });
    } else {
      setInvoiceData({ ...invoiceData, discount: 0, hasDiscount: false });
    }
  };

  const handleReferrer = (val) => {
    console.log(JSON.parse(val));
    const referrer = JSON.parse(val);
    setInvoiceData({ ...invoiceData, discountType: referrer.type, maximumDiscount: referrer.amount });
    setPatientData({...patientData, referrer})
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
      return;
    }
    try {
      const data = {
        name: patientData.name,
        age: patientData.age,
        contact: patientData.contact,
        referrerId: patientData.referrer.id,
        referrerName: patientData.referrer.name,
        doctorName: patientData.doctorName,
        testList: checkedTest,
        total: invoiceData.total,
        netAmount: invoiceData.netAmount,
        paid: invoiceData.paid,
      };
      console.log(data);
      //   const response = await axios.post("http://localhost:3000/api/v1/invoice/create", data)
      //   if (response.data.success) {
      //     console.log("data added")
      //     console.log(response.data)
      //     navigate("/invoice/print")

      //   }
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
  };

  return (
    <section className="flex mx-auto w-full">
      {loadingState == "error" && <ErrorModal title="Please select test" onClose={closeModal} />}
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
            hasDiscount={handleHasDiscount}
            onDiscount={(value) => setInvoiceData({ ...invoiceData, discount: value })}
            onAdjustment={(value) => setInvoiceData({ ...invoiceData, adjustment: parseFloat(value) })}
            referrer
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
