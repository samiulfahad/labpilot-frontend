/** @format */

import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import Modal from "../../../components/modal";
import { API_URL } from "../../../../config";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loadingState, setLoadingState] = useState(null);
  const [msg, setMsg] = useState("ইনভয়েসলিস্ট লোড হচ্ছে");

  const InvoiceTableHead = ["Invoice ID", "Name", "Amount", "Delivery", "Action"];

  const fetchInvoices = async (forceFetch = false) => {
    try {
      // if (!forceFetch) {
      //   // Avoid refetching if data already exists
      //   const cachedInvoices = localStorage.getItem("invoices");
      //   if (cachedInvoices) {
      //     setInvoices(JSON.parse(cachedInvoices));
      //     setLoadingState(null);
      //     setMsg(null);
      //     return;
      //   }
      // }

      // Fetch new data if no cache or forced
      setLoadingState("fetchingData");
      const response = await axios.get(API_URL + "/v1/invoice/all");
      if (response.data.success) {
        setInvoices(response.data.invoices);
        localStorage.setItem("invoices", JSON.stringify(response.data.invoices)); // Cache data
        setLoadingState(null);
        setMsg(null);
      } else {
        setLoadingState("error");
        setMsg(
          "ইনভয়েসের লিস্ট আনা সম্ভব হয়নি। পেইজটি রিফ্রেশ করে পুনরায় চেষ্টা করুন অথবা সার্পোটের জন্য কল করুন 01910 121 929 নাম্বারে"
        );
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setLoadingState("error");
      setMsg(
        "ইনভয়েসের লিস্ট আনা সম্ভব হয়নি। পেইজটি রিফ্রেশ করে পুনরায় চেষ্টা করুন অথবা সার্পোটের জন্য কল করুন 01910 121 929 নাম্বারে"
      );
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []); // Runs once when the component mounts

  const refreshData = () => {
    fetchInvoices(true);
  };
  const closeModal = () => {
    setLoadingState(null);
    setMsg(null);
  };

  return (
    <div className="w-full pl-4 mx-auto mt-4">
      {/* <button className="btn" onClick={refreshData}>
        রিফ্রেশ
      </button> */}
      {loadingState === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {loadingState === "fetchingData" && <Modal type="processing" title={msg} />}
      <Table type="AllInvoices" head={InvoiceTableHead} rows={invoices} />
    </div>
  );
};

export default AllInvoices;
