/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FallbackUI from "../../components/fallback-ui";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import InvoiceList from "./InvoiceList";

const RenderList = () => {
  const [list, setList] = useState([]);
  const [state, setState] = useState("");
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const fetchData = async () => {
    try {
      console.log(location.state);
      setState("processing");
      setMsg("ডাটা লোড হচ্ছে...");
      const startDate = location.state.startDate;
      const endDate = location.state.endDate;
      const response = await axios.get(API_URL + "/api/v1/invoice/render-list/", {
        params: { startDate, endDate },
      });
      if (response.data.success) {
          setList(response.data.list);
          console.log(response.data);
        setState("");
        setMsg("");
      } else {
        setMsg("ডাটা লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
        setState("error");
      }
    } catch (e) {
      setMsg("ডাটা লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
      setState("error");
      console.log(e.response);
    }
  };

  useEffect(() => {
    if (location?.state !== null) {
      fetchData();
    }
  }, []);

  const closeModal = () => {
    setState("");
    setMsg("");
  };
  return (
    <section>
      <div>
        {location?.state === null && (
          <FallbackUI msg={<p className="text-lg font-bold text-center mt-8">Nothing To Render</p>} />
        )}
        {state === "processing" && <Modal type="processing" title={msg} />}
        {state === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
              {list?.length === 0 && <p className="text-center text-lg font-bold mt-20">দুঃখিত, কোনো ডাটা পাওয়া যায়নি</p>}
              {location?.state?.list === "invoice" && <InvoiceList list= {list} />}
      </div>
    </section>
  );
};

export default RenderList;
