/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, LAB_V1 } from "../../../config";
import Modal from "../../components/modal";
import FullList from "./FullList";
import MyList from "./MyList";
import FallbackUI from "../../components/fallback-ui";

const UpdateTestList = () => {
  const [fullList, setFullList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [cachedData, setCachedData] = useState([]);
  const [msg, setMsg] = useState(null);
  const [status, setStatus] = useState("processing");

  // Fetch Full Test List
  useEffect(() => {
    const fetchList = async () => {
      try {
        setStatus("processing");
        setMsg("Lab-Pilot এ নিবন্ধিত টেস্টগুলি লোড করা হচ্ছে...");
        const response = await axios.get(API_URL + "/api/v1/system/test/all");
        if (response.data.success) {
          setFullList(response.data.list);
          setStatus(null);
          setMsg(null);
        } else {
          setFullList(null);
          setStatus("error");
          setMsg("Lab-Pilot এ নিবন্ধিত টেস্টগুলি লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
        }
      } catch (e) {
        setFullList(null);
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
    if (fullList === null) return;
    const fetchMyList = async () => {
      try {
        setStatus("processing");
        setMsg("আপনার ল্যাবের টেস্টলিস্ট লোড হচ্ছে...");
        const { data } = await axios.get(API_URL + LAB_V1 + "/test/all");
        if (data?.success) {
          setMyList(data.list);
          setCachedData(data.list);
          // console.log(cachedData);
          setStatus(null);
          setMsg(null);
        } else {
          setMyList(null);
          setCachedData([]);
          setStatus("error");
          setMsg("আপনার ল্যাবের টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।");
        }
      } catch (e) {
        setMyList(null);
        setCachedData([]);
        setStatus("error");
        setMsg("আপনার ল্যাবের টেস্টলিস্ট লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।");
        console.error("Error fetching my test list:", e);
      }
    };
    fetchMyList();
  }, [fullList]); // Trigger only after fullList is fetched

  // Handle Checkbox Selection
  const handleChecked = (test) => {
    const isChecked = myList.some((item) => item._id === test._id);

    if (isChecked) {
      // Remove the test if it's already in myList
      setMyList(myList.filter((item) => item._id !== test._id));
    } else {
      // Add the test if it's not in myList
      setMyList([...myList, test]);
    }
  };

  // Handle Modal Close
  const closeModal = () => {
    setStatus(null);
    setMsg(null);
  };

  const handleUpdate = async () => {
    try {
      // Create the updated list by prioritizing cachedData for matching objects
      const updatedList = myList.map((test) => {
        const cachedItem = cachedData.find((cached) => cached._id === test._id);
        return cachedItem || test; // Replace with cachedItem if found, otherwise keep test
      });

      setStatus("processing");
      setMsg("টেস্টলিস্ট আপডেট হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন....");

      const response = await axios.put(API_URL + LAB_V1 + "/testlist/update", {
        testList: updatedList, // Use the updated list for the request
      });

      if (response.data.success) {
        setStatus("success");
        setMsg(
          <div className="flex flex-col space-y-4">
            <div>টেস্টলিস্ট আপডেট করা হয়েছে।</div>
            <div>
              <Link className="px-4 py-1 rounded bgColor text-white" to="/testlist">
                নতুন টেস্টলিস্ট দেখুন
              </Link>
            </div>
          </div>
        );
      } else {
        setStatus("error");
        setMsg("টেস্টলিস্ট আপডেট করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
      }
      // console.log(response);
    } catch (e) {
      setStatus("error");
      setMsg("টেস্টলিস্ট আপডেট করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
      console.error(e);
    }
  };

  return (
    <section>
      {/* Modal for Status */}
      {status === "processing" && msg && <Modal type="processing" title={msg} />}
      {status === "success" && msg && <Modal type="success" title={msg} onClose={closeModal} />}
      {(status === "error" || myList === null) && msg && <Modal type="error" title={msg} onClose={closeModal} />}
      {status !== "processing" && fullList !== null && myList !== null && (
        <div>
          <FullList list={fullList} myList={myList} onChange={handleChecked} />
          <MyList list={myList} onUpdate={handleUpdate} />
        </div>
      )}
      {fullList === null && (
        <div className="-mt-20">
          <FallbackUI />
        </div>
      )}
    </section>
  );
};

export default UpdateTestList;
