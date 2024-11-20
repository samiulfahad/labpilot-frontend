/** @format */

import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import Modal from "../../../components/modal";
import { API_URL } from "../../../../config";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState(null);
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
      const response = await axios.get(API_URL + "/api/v1/invoice/all");
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

  const openModal = (invoice, modalType) => {
    if (modalType === "dueCollection") {
      setActiveInvoice(invoice);
      setLoadingState("dueCollectionModal");
      setMsg("বকেয়া বিল কালেকশন");
    }
  };

  const collectDue = async () => {
    setLoadingState("processingDueCollection");
    setMsg("ইনভয়েসটির পেমেন্ট তথ্য আপডেট করা হচ্ছে");
    console.log(activeInvoice);

    try {
      const response = await axios.put(API_URL + "/api/v1/invoice/update", {
        update: "paid",
        _id: activeInvoice._id,
      });
      if (response.data.success === true) {
        setLoadingState("paymentUpdated");
        setMsg("ইনভয়েসটি সফলভাবে আপডেট হয়েছে");
        const updatedInvoices = invoices.map((item) => {
          if (item._id === activeInvoice._id) {
            item.paid = activeInvoice.netAmount;
          }
          return item;
        });
        // Hey ChatGPT, Why it doesnot reflect on my screen??????????
        setInvoices(updatedInvoices);
      }
    } catch (e) {
      setLoadingState("error");
      setMsg(
        "ইনভয়েসটি আপডেট করা জায়নি। দয়া করে ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন। একই সমস্যা বারবার হলে আমাদের সাথে যোগাযোগ করিন 01910 121 929 এই নাম্বারে"
      );
      console.log(e);
    }
  };

  const refreshData = () => {
    fetchInvoices(true);
  };
  const closeModal = () => {
    setLoadingState(null);
    setMsg(null);
    setActiveInvoice(null);
  };

  return (
    <div className="w-full pl-4 mx-auto mt-4">
      {/* <button className="btn" onClick={refreshData}>
        রিফ্রেশ
      </button> */}
      {loadingState === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {loadingState === "paymentUpdated" && <Modal type="success" title={msg} onClose={closeModal} />}
      {(loadingState === "fetchingData" || loadingState === "processingDueCollection") && (
        <Modal type="processing" title={msg} />
      )}
      {loadingState === "dueCollectionModal" && (
        <Modal
          type="dueCollection"
          title={msg}
          name={activeInvoice.name}
          contact={activeInvoice.contact}
          invoiceId={activeInvoice.invoiceId}
          netAmount={activeInvoice.netAmount}
          paid={activeInvoice.paid}
          onDueCollection={collectDue}
          onClosingModal={closeModal}
        />
      )}

      <Table type="AllInvoices" head={InvoiceTableHead} rows={invoices} onOpenModal={openModal} />
    </div>
  );
};

export default AllInvoices;
