/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";

const index = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMsg("রেফারারদের তালিকা লোড হচ্ছে...");
        const response = await axios.get(API_URL + "/api/v1/user/referrer/all");

        if (response.data.success) {
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
        console.log(e.response.data);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      <div className="w-[550px]  p-8 mt-8 bg-white rounded-md ml-24">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-left text-lg font-semibold">Referrer List</p>
            <Link
              state={{ actionType: "add", title: "Add New Referrer" }}
              to="/referrer/add-edit"
              className="px-4 py-1 bgColor text-white text-semibold rounded-md"
            >
              Add New
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          {list.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center w-full bg-gray-200 py-1 px-2 rounded-lg my-1"
            >
              <p className="text-left w-60">{item.name}</p>
              <p className="text-left w-12">{item.commission}</p>
              <p className="text-left w-32">{item.commissionType}</p>

              <Link
                to={`/referrer/add-edit`}
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
                className="text-left bg-blue-gray-800 px-2 rounded-lg py-1 text-white"
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

export default index;
