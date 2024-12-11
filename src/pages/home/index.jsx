/** @format */

// Optional feature => Add title to the Card Element. Like if the date is "Today's Cash Memo", "Cash Memo - January, 2024 ", "Cash Memo - Feb 27, 2023", "Cash Memo - From Nov 5, 2024 to Dec 10, 2024"

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import CashMemo from "./CashMemo";
import { Link } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState("cashMemo");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [startDate, setStartDate] = useState("today");
  const [cachedDate, setCachedDate] = useState(null);
  const [endDate, setEndDate] = useState("today");
  const [date, setDate] = useState("");
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

  const nullMaker = () => {
    setStatus(null);
    setMsg(null);
    setStartDate("");
    setEndDate("");
    setPicker("");
    setDate("");
  };

  const fetchData = async (startDate, endDate) => {
    try {
      setStatus("processing");
      setMsg("Loading Data...")
      let url
      if (page === "cashMemo") url = "/api/v1/user/cashmemo"
      if (page === "commissionMemo") url = "/api/v1/user/commissionmemo"
      const response = await axios.get(API_URL + url, {
        params: { startDate, endDate },
      });
      if (response.data.success === true) {
        console.log(response.data);

        setCashMemo(response.data.cashMemo);
        setStatus(null);
        setMsg(null);
        setCachedDate({ startDate, endDate });
        nullMaker();
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

  const dateConverter = (date) => {
    const parts = date.split("-");
    const structured = parts[0][2] + parts[0][3] + parts[1] + parts[2];
    return structured;
  };

  const handleDateChange = (date) => {
    if (picker === "date") {
      const start = dateConverter(date) + "000000";
      const end = dateConverter(date) + "235959";
      setStartDate(start);
      setEndDate(end);
    }
    if (picker === "month") {
      const start = (dateConverter(date) + "01000000").replace("undefined", "");
      const end = (dateConverter(date) + "31000000").replace("undefined", "");
      setStartDate(start);
      setEndDate(end);
    }
    setDate(date);
  };

  const handleDateRange = (date, dateType) => {
    if (dateType === "startDate") {
      const start = dateConverter(date) + "000000";
      setStartDate(start);
    }
    if (dateType === "endDate") {
      const end = dateConverter(date) + "235959";
      setEndDate(end);
    }
  };

  const data = { list: "invoice", ...cachedDate };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={nullMaker} />}

      <div className="flex flex-wrap gap-2 justify-center items-center mx-auto px-10 mt-8">
        <div>
          <button onClick={() => fetchData("today", "today")} className="btn-sm">
            আজকের Cash Memo
          </button>
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

      {(picker === "date" || picker === "month") && (
        <Modal
          type="dateOrMonth"
          pick={picker}
          startDate={date}
          onDateChange={(date) => handleDateChange(date)}
          onSubmit={() => fetchData(startDate, endDate)}
          onClosingModal={nullMaker}
        />
      )}
      {picker === "dateRange" && (
        <Modal
          type="dateRange"
          onDateChange={handleDateRange}
          onSubmit={() => fetchData(startDate, endDate)}
          onClosingModal={nullMaker}
        />
      )}
      {page === "cashMemo" && (
        <>
          <CashMemo cashMemo={cashMemo} />
          <div className="mt-4 ml-32">
            <Link to="/render-list" state={data} className="btn-sm">
              Invoice দেখুন{" "}
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
