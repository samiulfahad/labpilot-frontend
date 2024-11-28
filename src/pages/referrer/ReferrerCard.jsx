/** @format */

import { useEffect, useLo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import axios from "axios";

const ReferrerCard = () => {
  const [referrer, setReferrer] = useState({ isDoctor: "yes", commissionType: "percentage" });
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  console.log(location.state);
  useEffect(() => {
    if (!location.state) {
      navigate("/referrer");
    }
  }, [navigate]);

  if (!location.state) {
    return <p>hhhhhh</p>;
  }

  const handleReferrer = (e) => {
    const { name, value } = e.target;
    setReferrer({ ...referrer, [name]: value });
  };

  const handleAction = async () => {
    setStatus("processing");
    setMsg("নতুন রেফারার তৈরি করা হচ্ছে...");
    try {
      const url = location?.state?.actionType === "edit" ? "/api/v1/user/referrer/edit" : "/api/v1/user/referrer/add";
      const method = location?.state?.actionType === "edit" ? axios.put : axios.post;
      console.log(referrer);
      const { data } = await method(API_URL + url, {
        name: referrer.name,
        commissionType: referrer.commissionType,
        commission: referrer.commission,
        isDoctor: referrer.isDoctor,
        description: referrer.description,
      });
      if (data.success) {
        setStatus("success");
        setMsg("সফলভাবে নতুন রেফারার তৈরি করা হয়েছে।");
      } else {
        setStatus("error");
        setMsg("নতুন রেফারার তৈরি করা যায়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।");
      }
    } catch (e) {
      setStatus("error");
      setMsg("নতুন রেফারার তৈরি করা যায়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।");
      console.log(e.response);
    }
  };

  const closeModal = () => {
    setMsg(null);
    setStatus(null);
  };

  return (
    <div className="w-[450px] mt-8 bg-white rounded-md ml-40">
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "success" && <Modal type="success" title={msg} onClose={closeModal} />}
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      <div className="p-8 pt-4">
        <p className="text-lg font-bold text-center py-2">{location?.state?.title}</p>
        <div className="flex space-x-4 justify-between items-center">
          <p>Name</p>
          <input name="name" value={referrer?.name || ""} onChange={handleReferrer} className="px-2 py-1 bg-gray-200" />
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Commission Type</p>
          <select
            name="commissionType"
            value={referrer?.commissionType || ""}
            onChange={handleReferrer}
            className="bg-gray-200"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Commission</p>
          <input
            name="commission"
            value={referrer?.commission || ""}
            onChange={handleReferrer}
            className="px-2 py-1 bg-gray-200"
          />
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Is a doctor</p>
          <select name="isDoctor" value={referrer?.isDoctor || ""} onChange={handleReferrer} className="bg-gray-200">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Description</p>
          <input
            name="description"
            value={referrer?.description || ""}
            onChange={handleReferrer}
            className="px-2 py-1 bg-gray-200"
          />
        </div>
        <div className="w-full mx-auto text-center mt-6">
          <button onClick={handleAction} className="px-4 py-2 bgColor rounded-md text-white font-semibold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferrerCard;
