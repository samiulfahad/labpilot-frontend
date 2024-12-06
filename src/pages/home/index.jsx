/** @format */

import { Option, Select } from "@material-tailwind/react";
import SaleCard from "./SaleCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";

const Home = () => {
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [cashMemo, setCashMemo] = useState({
    totalSale: 0,
    totalLabAdjustment: 0,
    totalReferrerDiscunt: 0,
    totalCommission: 0,
    totalReceived: 0,
    totalCashInCounter: 0,
    totalNetAmount: 0,
    totalInvoice: 0,
  });
  const handleDetails = () => {};
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
  };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div>
        <div className="ml-32 text-lg w-[600px] bg-white shadow-lg p-6 rounded-md mt-4">
          <p className="text-center text-xl font-bold">Today's Sale</p>
          <div className="flex justify-between items-center w-full my-4">
            <p>Today's Total Invoices</p>
            <p> {cashMemo.totalInvoice}</p>
          </div>

          <div className="flex justify-between items-center w-full">
            <p>Total Sale</p>
            <p>{cashMemo.totalSale}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Total Lab Discount</p>
            <p> {cashMemo.totalLabAdjustment}</p>
          </div>

          <div className="flex justify-between items-center w-full">
            <p>Total Referrers Discount</p>
            <p> {cashMemo.totalReferrerDiscunt}</p>
          </div>

          <div className="flex justify-between items-center w-full mt-4">
            <p>Net Sale (Total Sale - Discount)</p>
            <p> {cashMemo.totalNetAmount}</p>
          </div>

          <div className="flex  mt-4 justify-between items-center w-full">
            <p> Total Received  </p>
            <p> {cashMemo.totalReceived}</p>
          </div>

          <div className="flex justify-between items-center w-full">
            <p> Total Due </p>
            <p> {cashMemo.totalNetAmount - cashMemo.totalReceived}</p>
          </div>

          <div className="flex text-sm justify-between items-center w-full mt-4">
            <p>Total Commission</p>
            <p> {cashMemo.totalCommission}</p>
          </div>
          <div className="flex text-sm justify-between items-center w-full">
            <p>Final Receiving Amount</p>
            <p> {cashMemo.totalNetAmount - cashMemo.totalCommission}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
