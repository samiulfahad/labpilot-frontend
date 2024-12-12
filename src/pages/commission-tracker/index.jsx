/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import TimeFrame from "../../components/time-frame";
import CommissionTracker from "./CommissionTracker";

const index = () => {
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState("");

  const [commissionTracker, setCommissionTracker] = useState({});

  const fetchData = async (startDate, endDate) => {
    try {
      setStatus("processing");
      setMsg("Commission Tracker লোড হচ্ছে...");
      const response = await axios.get(API_URL + "/api/v1/user/commission-tracker", {
        params: { startDate, endDate },
      });
      if (response.data.success === true) {
        console.log(response.data);

        setCommissionTracker(response.data.commissionTracker);
        setStatus(null);
        setMsg(null);
      } else {
        setStatus("error");
        setMsg("Commission Tracker আনা সম্ভব হয়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
      }
    } catch (e) {
      console.log(e.response);
      setStatus("error");
      setMsg("Commission Tracker আনা সম্ভব হয়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
    }
  };

  useEffect(() => {
    fetchData("today", "today");
  }, []);

  const closeModal = () => {
    setStatus("");
    setMsg("");
  };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div className="flex flex-wrap gap-2 justify-center items-center mx-auto px-10">
        <TimeFrame onFetchData={(startDate, endDate) => fetchData(startDate, endDate)} />
        <CommissionTracker />
      </div>
    </section>
  );
};

export default index;
