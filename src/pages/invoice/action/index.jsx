/** @format */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PatientData from "./PatientData";
import { API_URL } from "../../../../config";
import Modal from "../../../components/modal";
import InvoiceSection from "./InvoiceSection";
import LabReports from "./LabReports";
import TriggerAction from "./TriggerAction";

const Action = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const _id = location?.state?._id || null;

  const [invoice, setInvoice] = useState({
    invoiceId: "",
    referrerId: "",
    name: "",
    age: "",
    contact: "",
    gender: "",
    doctorName: "",
    total: "",
    discount: "",
    labAdjustment: "",
    netAmount: "",
    paid: "",
    commission: "",
    testList: [],
  });
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState(null);
  const [disabled, setDisabled] = useState(true);

  // console.log(location.state);

  const fetchData = async () => {
    try {
      setStatus("processing");
      setMsg("ইনভয়েসের তথ্য লোড হচ্ছে");
      const response = await axios.get(API_URL + "/api/v1/invoice", {
        params: { _id: _id },
      });
      console.log(response.data);
      if (response.data.success === true) {
        const invoice = response.data.invoice;
        setInvoice(invoice);
        setStatus(null);
        setMsg(null);
      }
    } catch (e) {
      setStatus("error");
      setMsg("ইনভয়েসটি লোড করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন বা পেইজটি Refresh করুন");
      console.log(e);
    }
  };
  useEffect(() => {
    if (_id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!location.state) {
      navigate("/invoice/all", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
    console.log(invoice);
  };

  const handleUpdate = async () => {
    try {
      setStatus("processing");
      setMsg("তথ্য আপডেট করা হচ্ছে....");
      const patientData = {
        name: invoice.name,
        age: invoice.age,
        contact: invoice.contact,
        gender: invoice.gender,
        doctorName: invoice.doctorName,
      };
      const response = await axios.put(API_URL + "/api/v1/invoice/update/patient-data", {
        _id: invoice._id,
        patientData: patientData,
      });
      if (response.data.success) {
        setStatus("success");
        setMsg("তথ্য সফলভাবে আপডেট করা হয়েছে");
        setDisabled(true);
        console.log(response.data);
      } else {
        setMsg("তথ্য আপডেট করা যায়নি। অনুগ্রহ করে পেইজটি Refresh করে আবার চেষ্টা করুন");
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
      setMsg("তথ্য আপডেট করা যায়নি। অনুগ্রহ করে পেইজটি Refresh করে আবার চেষ্টা করুন");
      console.log(e.response.data);
    }
  };

  const handlePrint = async () => {
    try {
      setStatus("processing");
      setMsg("ইনভয়েসটি প্রিন্ট করার জন্য প্রস্তুত হচ্ছে");

      // Fetch the latest data
      const response = await axios.get(API_URL + "/api/v1/invoice", {
        params: { _id: invoice._id },
      });

      if (response.data.success) {
        const fetchedInvoice = response.data.invoice;

        const patientData = {
          name: fetchedInvoice.name,
          age: fetchedInvoice.age,
          contact: fetchedInvoice.contact,
          gender: fetchedInvoice.gender,
          doctorName: fetchedInvoice.doctorName,
        };

        const invoiceData = {
          invoiceId: fetchedInvoice.invoiceId,
          referrerId: fetchedInvoice.referrerId,
          total: fetchedInvoice.total,
          discount: fetchedInvoice.discount,
          labAdjustment: fetchedInvoice.labAdjustment,
          netAmount: fetchedInvoice.netAmount,
          paid: fetchedInvoice.paid,
          commission: fetchedInvoice.commission,
          testList: fetchedInvoice.testList,
        };

        navigate("/invoice/print", {
          state: {
            patientData: patientData,
            invoiceData: invoiceData,
          },
        });

        setStatus(null);
        setMsg(null);
      } else {
        setStatus("error");
        setMsg("Please Refresh the page and try again");
      }
    } catch (error) {
      setStatus("error");
      setMsg("ইনভয়েসটি প্রিন্ট করার জন্য তথ্য লোড করা যায়নি।");
      console.log(error);
    }
  };

  const handleActions = async (update) => {
    let processingMsg = null;
    let updatedField = {};
    if (update === "payment" || update === "collectDue") {
      if (update === "payment") {
        setStatus("dueCollectionModal");
        return null;
      }
      if (update === "collectDue") {
        processingMsg = "পেমেন্ট তথ্য আপডেট করা হচ্ছে";
      }
      updatedField = { paid: invoice.netAmount };

      if (update === "collectDue") {
        update = "payment";
      }
    } else if (update === "sendSMS") {
      processingMsg = "কাস্টমারকে SMS প্রেরণ করা হচ্ছে";
      updatedField = { notified: true };
    } else if (update === "reportDelivery") {
      processingMsg = "রিপোর্ট ডেলিভারি তথ্য আপডেট করা হচ্ছে";
      updatedField = { delivered: true };
    } else {
      return null;
    }

    try {
      setStatus("processing");
      setMsg(processingMsg);
      const response = await axios.put(API_URL + "/api/v1/invoice/update/actions", {
        _id: invoice._id,
        update: update,
      });
      if (response.data.success) {
        setStatus("success");
        setMsg("তথ্যটি সফলভাবে আপডেট করা হয়েছে");
        setInvoice({ ...invoice, ...updatedField });
      }
    } catch (e) {
      setStatus("error");
      setMsg("তথ্যটি আপডেট করা যায়নি। অনুগ্রহ করে পেইজটি Refresh করে আবার চেষ্টা করুন");
    }
  };

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  const closeModal = () => {
    setStatus(null);
    setMsg(null);
  };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "dueCollectionModal" && (
        <Modal
          type="dueCollection"
          invoiceId={invoice.invoiceId}
          name={invoice.name}
          title="Due Collection"
          contact={invoice.contact}
          netAmount={invoice.netAmount}
          paid={invoice.paid}
          onClosingModal={closeModal}
          onDueCollection={() => handleActions("collectDue")}
        />
      )}
      {status === "success" && <Modal type="success" title={msg} onClose={closeModal} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div className="mt-4">
        <div className="mb-8 w-full mx-auto text-center">
          <button onClick={handlePrint} className="px-4 py-2 bg-white text-blue-gray-700 rounded-md font-bold">
            Print Invoice
          </button>
        </div>

        <section className="flex justify-center space-x-8 items-start mx-auto">
          <div className="w-1/3 bg-white text-black shadow-lg rounded-lg px-8 py-4">
            <InvoiceSection invoice={invoice} />
          </div>

          <div className="w-2/5 bg-white text-black px-6 py-4 shadow-xl rounded-lg">
            <PatientData
              invoice={invoice}
              disabled={disabled}
              onEdit={handleEdit}
              onChange={handleChange}
              onSave={handleUpdate}
            />
            {/* <p>Managed bt Lab-Pilot.com</p> */}
          </div>
        </section>

        <section className="bg-white px-8 font-semibold py-4 my-8 w-1/2 rounded-lg shadow-lg mx-auto ">
          <TriggerAction invoice={invoice} onAction={handleActions} />
        </section>

        <section>
          <LabReports invoice={invoice} />
        </section>
      </div>
    </section>
  );
};

export default Action;
