/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Test from "./Test";
import Modal from "../../components/modal"
import { USER_ID, API_URL } from "../../../config";

const TestList = () => {
  const [testList, setTestList] = useState([]);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("processing");
      setMsg("টেস্টলিস্ট লোড করা হচ্ছে");
      try {
        const response = await axios.get(API_URL + "/api/v1/user/test/all", {
          _id: USER_ID,
        });
        if (response.data.success) {
          setTestList(response.data.list);
          setStatus(null);
          setMsg(null);
        } else {
          setTestList(null)
          setStatus("error");
          setMsg("টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
        }
      } catch (e) {
        setTestList(null)
        setStatus("error");
        setMsg("টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
        console.log(e);
      }
    };
    fetchData()
  }, []);

  const closeModal = () => {
    setStatus(null);
    setMsg(null);
  };

  return (
    <section>
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {testList?.length === 0 && status !== "processing" && (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
          <p>আপনি কোনো টেস্ট Add করেননি। আপনি যেসব টেস্ট করান সেগুলি Add করার জন্য নিচের "Add Test" বাটনে ক্লিক করুন</p>
          <Link to="/global/test/all" className="px-4 py-2 bgColor btn">Add Test</Link>
        </div>
      )}
    </section>
  );
};

export default TestList;
