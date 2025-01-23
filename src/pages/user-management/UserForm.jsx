import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../../components/modal";
import axios from "axios";
import { API_URL } from "../../../config";

const UserForm = () => {
  const { page } = useLocation().state || "";
  const submitBtn = page === "addUser" ? "Create User" : "Update User";
  const [state, setState] = useState("");
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    accessControl: [],
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    contactNo: "",
    nidCardNo: "",
    designation: "",
    joiningDate: "",
  });

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    // console.log("Credentials:", credentials);
  };

  const handlePersonalInfo = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    // console.log("Personal Info:", personalInfo);
  };

  const handleRoles = (e) => {
    const role = e.target.value;
    const isChecked = e.target.checked;
    let updatedRoles;

    if (isChecked) {
      updatedRoles = [...credentials.accessControl, role];
    } else {
      updatedRoles = credentials.accessControl.filter((r) => r !== role);
    }

    setCredentials({ ...credentials, accessControl: updatedRoles });
    // console.log("Access Control:", updatedRoles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.email) {
      setState("error");
      setMsg("Username, Email এবং Password - এই তিনটি Credentials অবশ্যই পুরণ করতে হবে");
      return;
    }
    if (credentials.accessControl.length === 0) {
      setState("error");
      setMsg(
        "নতুন User কে অবশ্যই যেকোনো একটি Access দিতে হবে। যেমনঃ Invoice তৈরি, Cashmemo, Commission Tracker ইত্যাদি"
      );
      return;
    }

    let method = axios.put;
    if (page === "addUser") {
      method = axios.post;
    }

    try {
      setState("processing");
      setMsg("Processing. Please wait.....");
      const response = await method(API_URL + "/api/v1/user/user-management", {
        credentials,
        personalInfo,
      });

      if (response.data.success) {
        // console.log(response.data);
        setState("success");
        let text = "New User Created Successfully";
        let msg = (
          <div>
            {text}
            <div className="py-2">
              <Link to={"/user-management"} className="btn-sm">
                See Userlist
              </Link>
            </div>
          </div>
        );
        setMsg(msg);
        if (page !== "addUser") {
          text = "User Updated";
        }
        setMsg(msg);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const closeModal = () => {
    setState(null);
    setMsg(null);
  };

  return (
    <div>
      {state === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {state === "processing" && <Modal type="processing" title={msg} />}
      {state === "success" && <Modal type="success" title={msg} />}
      <form className="md:pl-20 mt-10 flex space-y-2 flex-col md:w-1/2">
        {/* Login Info */}
        <div>
          <p className="text-lg font-bold text-black">Login Info</p>
        </div>
        <div className="flex justify-between items-center ">
          <p>Username</p>
          <input name="username" onChange={handleCredentials} className="px-2 py-1 border-none focus:outline-none" />
        </div>

        <div className="flex justify-between items-center ">
          <p>Password</p>
          <input name="password" onChange={handleCredentials} className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center ">
          <p>Email</p>
          <input
            name="email"
            onChange={handleCredentials}
            type="email"
            className="px-2 py-1 border-none focus:outline-none"
          />
        </div>

        {/* Rules */}
        <div>
          <p className="text-lg font-bold text-black">Power</p>
        </div>
        <div className="flex space-x-2">
          <input onChange={handleRoles} type="checkbox" value="postInvoice" />
          <p>Create Invoice</p>
        </div>
        <div className="flex space-x-2">
          <input onChange={handleRoles} type="checkbox" value="deleteInvoice" />
          <p>Delete Invoice</p>
        </div>
        <div className="flex space-x-2">
          <input onChange={handleRoles} type="checkbox" value="postReport" />
          <p>Upload Reports</p>
        </div>
        <div className="flex space-x-2">
          <input onChange={handleRoles} type="checkbox" value="getCommissionTracker" />
          <p>Access Commission Tracker</p>
        </div>
        <div className="flex space-x-2">
          <input onChange={handleRoles} type="checkbox" value="getCashMemo" />
          <p>Access Cashmemo</p>
        </div>
        <div className="flex space-x-2">
          <input onChange={handleRoles} type="checkbox" value="postReferrer" />
          <p>Manage Referrers</p>
        </div>

        {/* Personal Info */}
        <div>
          <p className="text-lg font-bold text-black">Personal Info</p>
        </div>
        <div className="flex justify-between items-center ">
          <p>Name</p>
          <input name="name" onChange={handlePersonalInfo} className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p>Contact No.</p>
          <input name="contactNo" onChange={handlePersonalInfo} className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p>NID Card No.</p>
          <input name="nidCardNo" onChange={handlePersonalInfo} className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p>Designation</p>
          <input
            name="designation"
            onChange={handlePersonalInfo}
            className="px-2 py-1 border-none focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center">
          <p>Joining Date</p>
          <input
            name="joiningDate"
            onChange={handlePersonalInfo}
            type="date"
            className="px-2 py-1 border-none focus:outline-none"
          />
        </div>

        <div className="">
          <button onClick={handleSubmit} className="btn my-10">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
