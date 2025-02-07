import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../../components/modal";
import axios from "axios";
import { API_URL, ACCESS_CONTROL, LAB_V1 } from "../../../config";

const StaffForm = () => {
  const locationState = useLocation().state || {};
  const { page, staff } = locationState;
  const submitBtn = page === "addStaff" ? "Create Staff" : "Update Staff";

  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    accessControl: [],
    fullName: "",
    contactNo: "",
  });

  useEffect(() => {
    if (staff) {
      setCredentials({ ...staff, password: "" }); // Ensure password is not pre-filled
    }
  }, [staff]);

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRoles = (e) => {
    const role = e.target.value;
    const isChecked = e.target.checked;

    const updatedRoles = isChecked
      ? [...credentials.accessControl, role]
      : credentials.accessControl.filter((r) => r !== role);

    setCredentials({ ...credentials, accessControl: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.email || (page === "addStaff" && !credentials.password)) {
      setStatus("error");
      setMsg("Username, Email এবং Password - এই তিনটি Credentials অবশ্যই পুরণ করতে হবে");
      return;
    }

    if (credentials.accessControl.length === 0) {
      setStatus("error");
      setMsg("নতুন User কে অবশ্যই যেকোনো একটি Access দিতে হবে। যেমনঃ Invoice তৈরি, Cashmemo, Commission Tracker ইত্যাদি");
      return;
    }

    try {
      setStatus("processing");
      setMsg("Processing. Please wait.....");

      let response = null;

      if (page === "addStaff") {
        response = await axios.post(`${API_URL}${LAB_V1}/staff-management`, credentials);
      } else {
        const { password, ...updateData } = credentials; // Exclude password when updating
        response = await axios.put(`${API_URL}${LAB_V1}/staff-management/${staff._id}`, updateData);
      }

      if (response.data.success) {
        setStatus("success");
        setMsg(
          <div>
            {page === "addStaff" ? "New Staff Created Successfully" : "Staff Updated"}
            <div className="py-2">
              <Link to={"/staff-management"} className="btn-sm">
                See Stafflist
              </Link>
            </div>
          </div>
        );
      } else if (response.data.duplicateUsername) {
        setStatus("error");
        setMsg("এই Username ব্যবহার করা হয়েছে। দয়া করে অন্য কোনো Username ব্যবহার করুন");
      } else {
        setStatus("error");
        setMsg("Something went wrong. Please refresh the page");
      }
    } catch (e) {
      setStatus("error");
      setMsg("Something went wrong. Please refresh the page");
      console.log(e);
    }
  };

  const closeModal = () => {
    setStatus(null);
    setMsg(null);
  };

  return (
    <div>
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {status === "processing" && <Modal type="processing" title={msg} />}
      {status === "success" && <Modal type="success" title={msg} />}

      <form className="md:pl-20 mt-10 flex space-y-2 flex-col md:w-1/2">
        {/* Staff Info */}
        <div>
          <p className="text-lg font-bold text-black">Staff Info</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Username</p>
          <input
            value={credentials.username}
            name="username"
            onChange={handleCredentials}
            className="px-2 py-1 bg-white border-1 rounded focus:outline-none"
          />
        </div>

        {page === "addStaff" && (
          <div className="flex justify-between items-center">
            <p>Password</p>
            <input
              value={credentials.password || ""}
              type="password"
              name="password"
              onChange={handleCredentials}
              className="px-2 py-1 bg-white border-1 rounded focus:outline-none"
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <p>Email</p>
          <input
            value={credentials.email}
            name="email"
            onChange={handleCredentials}
            type="email"
            className="px-2 py-1 bg-white border-1 rounded focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center">
          <p>Full Name</p>
          <input
            value={credentials.fullName}
            name="fullName"
            onChange={handleCredentials}
            type="text"
            className="px-2 py-1 bg-white border-1 rounded focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center">
          <p>Contact No</p>
          <input
            value={credentials.contactNo}
            name="contactNo"
            onChange={handleCredentials}
            type="number"
            className="px-2 py-1 bg-white border-1 rounded focus:outline-none"
          />
        </div>

        {/* Access Control */}
        <div>
          <p className="text-lg font-bold text-black">Access</p>
        </div>

        {Object.entries(ACCESS_CONTROL).map(([key, value]) => (
          <div key={key}>
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                value={key}
                onChange={handleRoles}
                checked={credentials.accessControl.includes(key)}
                className="w-[30px] h-[30px]"
              />{" "}
              <span className="px-2">{value}</span>
            </label>
          </div>
        ))}

        <div>
          <button onClick={handleSubmit} className="btn mt-4 my-8">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
