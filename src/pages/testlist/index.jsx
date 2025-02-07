/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Test from "./Test";
import Modal from "../../components/modal";
import { USER_ID, API_URL, LAB_V1 } from "../../../config";
import FallbackUI from "../../components/fallback-ui";

const TestList = () => {
  const [testList, setTestList] = useState([]);
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("processing");
      setMsg("টেস্টলিস্ট লোড করা হচ্ছে");
      try {
        const response = await axios.get(API_URL + LAB_V1 + "/test/all", { params: { _id: USER_ID } });
        if (response.data.success) {
          // console.log(response.data);
          setTestList(response.data.list);
          setStatus(null);
          setMsg(null);
        } else {
          setTestList(null);
          setStatus("error");
          setMsg("টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
        }
      } catch (e) {
        setTestList(null);
        setStatus("error");
        setMsg("টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
        console.log(e.response.data);
      }
    };
    fetchData();
  }, []);

  const closeModal = () => {
    setStatus(null);
    setMsg(null);
  };

  return (
    <section>
      {testList === null && (
        <div className="-mt-20">
          {" "}
          <FallbackUI />{" "}
        </div>
      )}

      {testList !== null && testList?.length > 0 && (
        <div className="w-1/2">
          <p className="font-bold text-lg text-left pt-8 p-8"> Tests and Prices </p>
          {testList?.map((test) => (
            <Test
              key={test._id}
              test={test}
              statusUpdate={(status) => setStatus(status)}
              msgUpdate={(msg) => setMsg(msg)}
            />
          ))}
          <div className="my-12 ml-8">
            <Link to="/testlist/update" className="btn-sm">
              Add/Delete Test
            </Link>
          </div>
        </div>
      )}

      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {status !== "processing" && testList?.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
          <p>আপনি কোনো টেস্ট Add করেননি। আপনি যেসব টেস্ট করান সেগুলি Add করার জন্য নিচের "Add Test" বাটনে ক্লিক করুন</p>
          <Link to="/testlist/update" className="px-4 py-2 bgColor btn">
            Add Test
          </Link>
        </div>
      )}
    </section>
  );
};

export default TestList;
