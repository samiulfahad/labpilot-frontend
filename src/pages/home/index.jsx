/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import Card from "./Card";

const Home = () => {
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [picker, setPicker] = useState("");

  const [cashMemo, setCashMemo] = useState({
    totalSale: 0,
    totalLabAdjustment: 0,
    totalReferrerDiscount: 0,
    totalCommission: 0,
    totalReceived: 0,
    totalNetAmount: 0,
    totalInvoice: 0,
  });
  const months = [
    { name: "জানুয়ারি", value: "january" },
    { name: "ফেব্রুয়ারি", value: "january" },
    { name: "মার্চ", value: "january" },
    { name: "এপ্রিল", value: "january" },
    { name: "মে", value: "january" },
    { name: "জুন", value: "january" },
    { name: "জুলাই", value: "january" },
    { name: "অগাস্ট", value: "january" },
    { name: "সেপ্টেম্বর", value: "january" },
    { name: "অক্টোবর", value: "january" },
    { name: "নভেম্বর", value: "january" },
    { name: "ডিসেম্বর", value: "january" },
  ];

  const fetchData = async () => {
    try {
      setStatus("processing");
      const response = await axios.get(API_URL + "/api/v1/user/cashmemo");
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
    fetchData();
  }, []);

  const closeModal = () => {
    setStatus(null);
    setMsg(null);
    setStartDate("");
    setEndDate("");
    setPicker("");
  };

  const dateConverter = (date) => {
    const parts = date.split("-");
    const structured = parts[0][2] + parts[0][3] + parts[1] + parts[2];
    return structured;
  };

  const handleRangeSelection = (date, dateType) => {
    if (dateType === "startDate") {
      const start = dateConverter(date) + "000000";
      setStartDate(start);
    }
    if (dateType === "endDate") {
      const end = dateConverter(date) + "235959";
      setEndDate(end);
    }
  };

  const handleSubmit = () => {
    if (picker === "date") {
      const start = dateConverter(startDate) + "000000";
      const end = dateConverter(startDate) + "235959";
      console.log(start);
      console.log(end);
    }
    if (picker === "month") {
      const start = (dateConverter(startDate) + "01000000").replace("undefined", "")
      const end = (dateConverter(startDate) + "31000000").replace("undefined", "")
      console.log(start);
      console.log(end);
    }
    if (picker === "dateRange") {
      console.log(startDate);
      console.log(endDate);
    }
  };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}

      <div className="flex flex-wrap gap-2 justify-center items-center mx-auto px-10 mt-8">
        <div>
          <button className="btn-sm">আজকের Cash Memo</button>
        </div>
        <div className="text-left flex flex-col justify-center items-center space-y-2">
          <button onClick={() => setPicker("date")} className="btn-sm">
            নির্দিষ্ট তারিখের Cash Memo দেখুন
          </button>
        </div>

        <div className="text-left flex flex-col justify-center items-center space-y-2">
          <button onClick={() => setPicker("month")} className="btn-sm">
            নির্দিষ্ট মাসের Cash Memo দেখুন
          </button>
        </div>

        <div className="text-left flex flex-col justify-center items-center space-y-2">
          <button onClick={() => setPicker("dateRange")} className="btn-sm">
            নির্দিষ্ট দিনসমূহের Cash Memo দেখুন
          </button>
        </div>
      </div>

      <Card cashMemo={cashMemo} />
      {(picker === "date" || picker === "month") && (
        <Modal
          type="dateOrMonth"
          pick={picker}
          startDate={startDate}
          onSelection={(date) => setStartDate(date)}
          onSubmit={handleSubmit}
          onClosingModal={closeModal}
        />
      )}
      {picker === "dateRange" && (
        <Modal
          type="dateRange"
          onSelection={handleRangeSelection}
          onSubmit={handleSubmit}
          onClosingModal={closeModal}
        />
      )}
    </section>
  );
};

export default Home;
