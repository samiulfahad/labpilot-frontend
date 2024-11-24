/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import FullList from "./FullList";
import MyList from "./MyList";

const GlobalTestList = () => {
  const [fullList, setFullTList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [msg, setMsg] = useState(null);
  const [status, setStatus] = useState(null);

  // Fetch Global Test List
  useEffect(() => {
    const fetchList = async () => {
      try {
        setStatus("processing");
        setMsg("Lab-Pilot এ নিবন্ধিত টেস্টগুলি লোড করা হচ্ছে...");
        const response = await axios.get(API_URL + "/api/v1/global/test/all");
        if (response.data.success) {
          setFullTList(response.data.list);
          setStatus(null);
          setMsg(null);
        } else {
          setFullTList(null);
          setStatus("error");
          setMsg("Lab-Pilot এ নিবন্ধিত টেস্টগুলি লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
        }
      } catch (e) {
        setFullTList(null);
        setStatus("error");
        setMsg("Lab-Pilot এ নিবন্ধিত টেস্টগুলি লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
        console.error("Error fetching global test list:", e);
      }
    };
    fetchList();
  }, []);

  // Fetch My Test List (only after Global Test List has been fetched)
  useEffect(() => {
    if (fullList?.length === 0) return; // Wait until fullList is fetched
    const fetchMyList = async () => {
      try {
        setStatus("processing");
        setMsg("আপনার ল্যাবের টেস্টলিস্ট লোড হচ্ছে...");
        const { data } = await axios.get(API_URL + "/api/v1/user/test/all");
        if (data?.success) {
          setMyList(data.list);
          setStatus(null);
          setMsg(null);
        } else {
          setMyList(null);
          setStatus("error");
          setMsg("আপনার ল্যাবের টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।");
        }
      } catch (e) {
        setMyList(null);
        setStatus("error");
        setMsg("আপনার ল্যাবের টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।");
        console.error("Error fetching my test list:", e);
      }
    };
    fetchMyList();
  }, [fullList]); // Trigger only after fullList is fetched

  // Handle Modal Close
  const closeModal = () => {
    setStatus(null);
    setMsg(null);
  };

  // Handle Checkbox Selection
  const handleChecked = (test) => {
    if (myList.includes(test)) {
      setMyList(myList.filter((item) => item !== test)); // Remove if already checked
    } else {
      setMyList([...myList, test]); // Add if not checked
    }
  };

  return (
    <section>
      {/* Modal for Status */}
      {status === "processing" && msg && <Modal type="processing" title={msg} />}
      {(status === "error" || myList === null) && msg && <Modal type="error" title={msg} onClose={closeModal} />}
      {fullList !== null && myList !== null && status !== "processing" && (
        <div>
          <FullList list={fullList} myList={myList} onChange={handleChecked} />
          <MyList list={myList} />
        </div>
      )}
    </section>
  );
};

export default GlobalTestList;
