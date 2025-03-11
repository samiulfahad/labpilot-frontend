/** @format */

import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import Modal from "../../../components/modal";
import { API_URL } from "../../../../config";
import FallbackUI from "../../../components/fallback-ui";
import api from "../../../services/http";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState("ইনভয়েসলিস্ট লোড হচ্ছে");

  const InvoiceTableHead = ["Invoice ID", "নাম", "পেমেন্ট", "রিপোর্ট ডেলিভারি", "Action"];

  const fetchInvoices = async () => {
    try {
      // Fetch new data if no cache or forced
      setStatus("processing");
      const response = await api.get("/v1/invoice/all");
      if (response.data.success) {
        setInvoices(response.data.invoices);
        setStatus(null);
        setMsg(null);
      } else {
        setInvoices(null);
        setStatus("error");
        setMsg("ইনভয়েসের লিস্ট আনা সম্ভব হয়নি। পেইজটি রিফ্রেশ করে পুনরায় চেষ্টা করুন");
      }
    } catch (error) {
      setInvoices(null);
      console.log("Error fetching invoices:", error?.response?.data);
      setStatus("error");
      setMsg("ইনভয়েসের লিস্ট আনা সম্ভব হয়নি। পেইজটি রিফ্রেশ করে পুনরায় চেষ্টা করুন");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []); // Runs once when the component mounts

  const openModal = (invoice, modalType) => {
    if (modalType === "dueCollection") {
      setActiveInvoice(invoice);
      setStatus("dueCollectionModal");
      setMsg("বকেয়া বিল কালেকশন");
    }
    if (modalType === "reportDelivery") {
      setActiveInvoice(invoice);
      setStatus("reportDeliveryModal");
      setMsg("রিপোর্ট ডেলিভারি");
    }
  };

  const updateInvoice = async (updateType) => {
    const errorMsg = "ইনভয়েসটি আপডেট করা যায়নি। দয়া করে পেইজটি Refresh করুন অথবা ইন্টারনেট সংযোগ চেক করুন।";
    const successMsg = "ইনভয়েসটি সফলভাবে আপডেট হয়েছে";

    let msg = null;
    if (updateType === "payment") {
      msg = "পেমেন্ট তথ্য আপডেট করা হচ্ছে...";
    } else if (updateType === "reportDelivery") {
      msg = "রিপোর্ট ডেলিভারি তথ্য আপডেট করা হচ্ছে...";
    } else {
      return null;
    }
    setStatus("processing");
    setMsg(msg);

    try {
      const response = await axios.put(API_URL + "/api/v1/invoice/update/actions", {
        update: updateType,
        _id: activeInvoice._id,
      });

      if (response.data.success === true) {
        setStatus("success");
        setMsg(successMsg);

        const updatedInvoices = invoices.map((item) => {
          if (item._id === activeInvoice._id) {
            if (updateType === "payment") {
              item.paid = activeInvoice.netAmount;
            } else if (updateType === "reportDelivery") {
              item.delivered = true;
            }
          }
          return item;
        });

        setInvoices(updatedInvoices);
      } else {
        setStatus("error");
        setMsg(errorMsg);
      }
    } catch (e) {
      setStatus("error");
      setMsg(errorMsg);
      console.log(e);
    }
  };

  const closeModal = () => {
    setStatus(null);
    setMsg(null);
    setActiveInvoice(null);
  };

  return (
    <div className="w-full pl-4 mx-auto mt-4">
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {status === "success" && <Modal type="success" title={msg} onClose={closeModal} />}
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "dueCollectionModal" && (
        <Modal
          type="dueCollection"
          title={msg}
          invoiceId={activeInvoice.invoiceId}
          name={activeInvoice.name}
          contact={activeInvoice.contact}
          netAmount={activeInvoice.netAmount}
          paid={activeInvoice.paid}
          onDueCollection={() => updateInvoice("payment")}
          onClosingModal={closeModal}
        />
      )}

      {status === "reportDeliveryModal" && (
        <Modal
          type="reportDelivery"
          title={msg}
          invoiceId={activeInvoice.invoiceId}
          name={activeInvoice.name}
          contact={activeInvoice.contact}
          netAmount={activeInvoice.netAmount}
          paid={activeInvoice.paid}
          onReportDelivery={() => updateInvoice("reportDelivery")}
          onClosingModal={closeModal}
        />
      )}

      {invoices === null && (
        <div className="-mt-28">
          {" "}
          <FallbackUI />{" "}
        </div>
      )}

      {invoices !== null && (
        <Table type="AllInvoices" head={InvoiceTableHead} rows={invoices} onOpenModal={openModal} />
      )}
    </div>
  );
};

export default AllInvoices;
