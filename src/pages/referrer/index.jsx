/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, LAB_V1 } from "../../../config";
import Modal from "../../components/modal";

const ReferrerList = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMsg("রেফারারদের তালিকা লোড হচ্ছে...");
        const response = await axios.get(API_URL + LAB_V1 + "/referrer/all");

        if (response?.data.success) {
          setList(response.data.list);
          setStatus("success");
          setMsg(null);
        } else {
          setStatus("error");
          setMsg("রেফারারদের তালিকা আনা সম্ভব হয়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন");
          console.log(response.data);
        }
      } catch (e) {
        setStatus("error");
        setMsg("রেফারারদের তালিকা আনা সম্ভব হয়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন");
        console.log(e.response?.data);
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
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div className="w-[550px]  p-8 mt-8 bg-white rounded-md ml-24">
        {/* Button to Add new Referrer */}
        <div>
          <div className="flex justify-between items-center">
            <p className="text-left text-lg font-semibold">Referrer List</p>
            <Link state={{ actionType: "add", title: "Add New Referrer" }} to="/referrer/add" className="btn-md">
              Add New
            </Link>
          </div>
        </div>
        {/* List of Referrers */}
        <div className="flex flex-col justify-start items-center">
          {list.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center w-full bg-gray-200 py-1 px-2 rounded-lg my-1"
            >
              <p className="text-left w-60">{item.name}</p>
              <p className="text-left w-12">{item.commission}</p>
              <p className="text-left w-32">{item.commissionType}</p>
              {/* Edit Referrer Button */}
              <Link
                to={`/referrer/edit`}
                state={{
                  actionType: "edit",
                  title: "Edit Referrer",
                  referrerId: item._id,
                  name: item.name,
                  commission: item.commission,
                  commissionType: item.commissionType,
                  isDoctor: item.isDoctor,
                  description: item.description,
                }}
                className="btn-sm"
              >
                {" "}
                Edit{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferrerList;
