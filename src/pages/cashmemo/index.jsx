/** @format */

// Optional feature => Add title to the Card Element. Like if the date is "Today's Cash Memo", "Cash Memo - January, 2024 ", "Cash Memo - Feb 27, 2023", "Cash Memo - From Nov 5, 2024 to Dec 10, 2024"

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import CashMemo from "./CashMemo";
import TimeFrame from "../../components/time-frame";
import { Link } from "react-router-dom";

const index = () => {
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState("");
  const [startDate, setStartDate] = useState("today");
  const [endDate, setEndDate] = useState("today");
  const [formattedDate, setFormattedDate] = useState("Today");

  const [cashMemo, setCashMemo] = useState({
    totalSale: 0,
    totalLabAdjustment: 0,
    totalReferrerDiscount: 0,
    totalCommission: 0,
    totalReceived: 0,
    totalNetAmount: 0,
    totalInvoice: 0,
  });

  const fetchData = async (startDate, endDate) => {
    try {
      setStatus("processing");
      setMsg("ক্যাশমেমো লোড হচ্ছে...");
      const response = await axios.get(API_URL + "/api/v1/user/cashmemo", {
        params: { startDate, endDate },
      });
      if (response.data.success === true) {
        console.log(response.data);

        setCashMemo(response.data.cashMemo);
        setStatus(null);
        setMsg(null);
      } else {
        setStatus("error");
        setMsg("ক্যাশমেমো আনা সম্ভব হয়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
      }
    } catch (e) {
      console.log(e.response);
      setStatus("error");
      setMsg("ক্যাশমেমো আনা সম্ভব হয়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
    }
  };

  useEffect(() => {
    fetchData("today", "today");
  }, []);

  const handleFetchData = (startDate, endDate, fDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchData(startDate, endDate);
    setFormattedDate(fDate);
    console.log(fDate);
  };
  const closeModal = () => {
    setStatus("");
    setMsg("");
  };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div className="-ml-32 flex flex-wrap gap-2 justify-center items-center mx-auto px-10">
        <TimeFrame onFetchData={handleFetchData} />
        <CashMemo cashMemo={cashMemo} formattedDate={formattedDate} />
        {cashMemo.totalInvoice !== 0 && (
          <div className="mx-auto w-full flex justify-center items-center my-2">
            <Link to="/render-list" state={{ list: "invoice", startDate, endDate, formattedDate }} className="btn-sm">
              ইনভয়েসগুলি দেখুন
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default index;
