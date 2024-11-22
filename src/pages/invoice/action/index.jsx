/** @format */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PatientData from "./PatientData";
import { API_URL } from "../../../../config";
import Modal from "../../../components/modal";
import axios from "axios";
import InvoiceDate from "./InvoiceDate";
import InvoiceSection from "./InvoiceSection";
import LabReports from "./LabReports";

const Action = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const _id = location?.state?._id || null;
  const [id, setId] = useState(_id);
  const [invoice, setInvoice] = useState({});
  const [patientData, setPatientData] = useState({ name: "", age: "", contact: "", gender: "", doctorName: "" });
  const [activeInput, setActiveInput] = useState(null);
  const [activeInputValue, setActiveInputValue] = useState(null);
  const [loadingState, setLoadingState] = useState("");
  const [msg, setMsg] = useState(null);
  // console.log(location.state);

  const fetchData = async () => {
    try {
      setLoadingState("fetchingData");
      setMsg("ইনভয়েসের তথ্য লোড হচ্ছে");
      const response = await axios.get(API_URL + "/api/v1/invoice", {
        params: { _id: id },
      });
      console.log(response.data);
      if (response.data.success === true) {
        const invoice = response.data.invoice;
        setInvoice(invoice);
        setPatientData({
          name: invoice.name,
          age: invoice.age,
          contact: invoice.contact,
          gender: invoice.gender,
          doctorName: invoice.doctorName,
        });
        setLoadingState(null);
        setMsg(null);
      }
    } catch (e) {
      setLoadingState("error");
      setMsg("ইনভয়েসের তথ্য লোড করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন বা পেইজটি Refresh করুন");
      console.log(e);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!location.state) {
      navigate("/invoice/all", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e === "cancel") {
      // When cancel button is clicked, make the values to initial value
      setPatientData({
        name: invoice.name,
        age: invoice.age,
        contact: invoice.contact,
        gender: invoice.gender,
        doctorName: invoice.doctorName,
      });
      setActiveInput(null);
      setActiveInputValue(null);
      return;
    }
    const { name, value } = e.target;
    setActiveInput(name);
    setActiveInputValue(value);

    setPatientData({ ...patientData, [name]: value });
    console.log(patientData);
  };

  const handleUpdate = async () => {
    try {
      setLoadingState("updating");
      setMsg("ইনভয়েসের তথ্যটি আপডেট করা হচ্ছে");
      const response = await axios.put(API_URL + "/api/v1/invoice/update", {
        _id: id,
        update: activeInput,
        value: activeInputValue,
      });
      if (response.data.success) {
        setPatientData({ ...patientData, activeInput: activeInputValue });
        setLoadingState("success");
        setMsg("তথ্যটি সফলভাবে আপডেট করা হয়েছে");
        setActiveInput(null);
        setActiveInputValue(null);
        console.log(response.data);
      }
    } catch (e) {
      setLoadingState("error");
      setMsg("তথ্যটি আপডেট করা যায়নি। অনুগ্রহ করে পেইজটি Refresh করে আবার চেষ্টা করুন");
      setPatientData({
        name: invoice.name,
        age: invoice.age,
        contact: invoice.contact,
        gender: invoice.gender,
        doctorName: invoice.doctorName,
      });
      setActiveInput(null);
      setActiveInputValue(null);
      console.log(e.response.data);
    }
  };
  const closeModal = () => {
    setLoadingState(null);
    setMsg(null);
  };

  return (
    <section>
      {loadingState === "fetchingData" && <Modal type="processing" title={msg} />}
      {loadingState === "updating" && <Modal type="processing" title={msg} />}
      {loadingState === "success" && <Modal type="success" title={msg} onClose={closeModal} />}
      {loadingState === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div className="mt-4">
        <div className="mb-8 w-full mx-auto text-center -ml-20">
          <Link className="px-4 py-2 border-2 text-blue-gray-500 border-blue-gray-700 font-bold">Print Invoice</Link>
        </div>
        <div className="flex justify-start space-x-8 items-start ml-10 mx-auto">
          <div className="w-1/3">
            <InvoiceSection invoice={invoice} />
          </div>

          <div className="w-2/5">
            <PatientData
              name="name"
              label="Name"
              val={patientData.name || ""}
              onChange={handleChange}
              onUpdate={handleUpdate}
            />
            <PatientData
              name="contact"
              label="Phone"
              val={patientData.contact || ""}
              onChange={handleChange}
              onUpdate={handleUpdate}
            />
            <PatientData
              name="age"
              label="Age"
              val={patientData.age || ""}
              onChange={handleChange}
              onUpdate={handleUpdate}
            />
            <PatientData
              name="doctorName"
              label="Doctor"
              val={patientData.doctorName || ""}
              onUpdate={handleUpdate}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <p>Gender</p>
              <p className="font-bold w-2/5 text-left">{patientData.gender || ""}</p>
              <button onChange={handleChange} className="btn-sm">
                Change
              </button>
            </div>

            <div className="flex justify-between text-justify">
              <p className="text-nowrap">Report Delivery</p>
              <p className="font-bold w-full py-1 px-2 text-right">{invoice?.delivered ? "Yes" : "NO"}</p>
            </div>

            <div className="flex w-full justify-between">
              <p className="text-nowrap">SMS Sent</p>
              <p className="font-bold w-full py-1 px-2 text-right">{invoice?.notified ? "Yes" : "NO"}</p>
            </div>

          </div>
        </div>

        <section>
          <LabReports invoice={invoice} />
        </section>
      </div>
    </section>
  );
};

export default Action;
