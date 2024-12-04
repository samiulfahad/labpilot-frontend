/** @format */

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";
import axios from "axios";

const defaultReferrer = {
  referrerId: null,
  name: "",
  commissionType: "percentage",
  commission: "",
  isDoctor: "yes",
  description: "",
};
const ReferrerCard = () => {
  const [referrer, setReferrer] = useState(defaultReferrer);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) {
      navigate("/referrer");
    } else if (location.state.actionType === "edit") {
      const { referrerId, name, commission, commissionType, isDoctor, description } = location.state;
      setReferrer({ referrerId, name, commission, commissionType, isDoctor, description });
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
    const startMsg = location.state.actionType === "add" ? "নতুন রেফারার তৈরি করা হচ্ছে..." : "তথ্য আপডেট হচ্ছে...";
    const successMsg =
      location.state.actionType === "add" ? "নতুন রেফারার সফলভাবে তৈরি হয়েছে।" : "তথ্য সফলভাবে আপডেট হয়েছে";
    const failedMsg =
      location.state.actionType === "add"
        ? "দুঃখিত, নতুন রেফারার তৈরি করা যায়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।"
        : "দুঃখিত, তথ্য আপডেট করা যায়নি। দয়া করে পেইজটি Refresh/Reload করে আবার চেষ্টা করুন।";
    setStatus("processing");
    setMsg(startMsg);
    try {
      const url = location?.state?.actionType === "edit" ? "/api/v1/user/referrer/edit" : "/api/v1/user/referrer/add";
      const method = location?.state?.actionType === "edit" ? axios.put : axios.post;
      const response = await method(API_URL + url, { ...referrer });
      const div = (
        <div className="flex flex-col justify-center items-center space-y-2">
          {" "}
          <p>{successMsg}</p>{" "}
          <Link to="/referrer/all" className="px-4 py-2 bgColor text-white">
            Go To referrer list
          </Link>{" "}
        </div>
      );
      if (response.data.success) {
        setStatus("success");
        setMsg(div);
        setReferrer(defaultReferrer);
      } else {
        setStatus("error");
        setMsg(failedMsg);
      }
    } catch (e) {
      setStatus("error");
      setMsg(failedMsg);
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
          <input name="name" value={referrer.name} onChange={handleReferrer} className="px-2 py-1 bg-gray-200" />
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Commission Type</p>
          <select
            name="commissionType"
            value={referrer.commissionType}
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
            value={referrer.commission}
            onChange={handleReferrer}
            className="px-2 py-1 bg-gray-200"
          />
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Is a doctor</p>
          <select name="isDoctor" value={referrer.isDoctor} onChange={handleReferrer} className="bg-gray-200">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="flex space-x-4 justify-between items-center">
          <p>Description</p>
          <input
            name="description"
            value={referrer.description}
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
