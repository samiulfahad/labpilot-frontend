/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal";

const StaffProfile = () => {
  const [disabled, setDisabled] = useState(true);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("")

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  const showModal = () => {
    setStatus("changePassword");
  };
  const handlePasswordChange = () => {};

  const closeModal = ( ) => {
    setStatus("")
    setMsg("")
  }

  return (
    <section>
      {status === "changePassword" && (
        <Modal type="changePassword" onSubmit={handlePasswordChange} onClosingModal={closeModal} />
      )}
      <div className="flex space-x-4">
        {/* Your Info */}
        <div className="flex flex-col justify-between items-start space-y-2 ">
          <div className="flex justify-between items-center text-center">
            <p className="font-bold text-lg text-right w-28 py-4">Your Info</p>
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Username</p>
            <input value="robin123" disabled={true} className="px-4 py-1 w-40 text-left" />
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Full Name</p>
            <input
              value="Technologist XXXXX"
              disabled={disabled}
              className={`px-4 py-1 w-48 text-left ${!disabled ? "bg-white" : "bg-gray-300"}`}
            />
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Contact</p>
            <input
              value="01712121212"
              disabled={disabled}
              className={`px-4 py-1 w-48 text-left ${!disabled ? "bg-white" : "bg-gray-300"}`}
            />
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Email</p>
            <input
              value="labxxxxx@gmail.com"
              disabled={disabled}
              className={`px-4 py-1 w-48 text-left ${!disabled ? "bg-white" : "bg-gray-300"}`}
            />
          </div>

          <div className="flex justify-between items-center text-center">
            {disabled && (
              <button onClick={handleEdit} className="ml-28 btn-md !px-6">
                Edit Info
              </button>
            )}
          </div>

          {!disabled && (
            <div className="flex justify-end items-center space-x-4 w-4/5">
              <button className="px-2 py-1 bgColor text-white rounded">Save</button>
              <button onClick={handleEdit} className="px-2 py-1 bg-red-400 text-white rounded">
                Cancel
              </button>
            </div>
          )}

          {/* Security and Password */}
          <div className="flex justify-start space-x-4 items-center text-center w-full">
            <p className="font-bold text-lg text-right w-28 py-4">Security</p>
            <button onClick={showModal} className="btn-sm">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default StaffProfile;
