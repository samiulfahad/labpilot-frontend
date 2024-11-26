/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [disabled, setDisabled] = useState(true);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("processing");

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  return (
    <section>
      <div className="flex space-x-4">
        {/* Lab Info */}
        <div className="flex flex-col justify-between items-start space-y-2 ">
          <div className="flex justify-between items-center text-center w-full">
            <p className="font-bold text-lg text-right w-28 py-4">Lab Info</p>
            {disabled && (
              <button onClick={handleEdit} className="mr-20 px-4 bgColor text-center flex-shrink-0 w-16 h-8 text-white">
                Edit
              </button>
            )}
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Name</p>
            <input value="Azizul Haque Diagonostic Center" disabled={disabled} className="px-4 py-1 w-80 text-center" />
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Location</p>
            <input value="Bhaluka, Mymensingh" disabled={disabled} className="px-4 py-1 w-80 text-center" />
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Contact</p>
            <input value="01712121212" disabled={disabled} className="px-4 py-1 w-80 text-center" />
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">Email</p>
            <input value="labxxxxx@gmail.com" disabled={disabled} className="px-4 py-1 w-80 text-center" />
          </div>
          {!disabled && (
            <div className="flex justify-end items-center space-x-4 w-4/5">
              <button className="px-2 py-1 bgColor text-white rounded">Save</button>
              <button onClick={handleEdit} className="px-2 py-1 bg-red-400 text-white rounded">
                Cancel
              </button>
            </div>
          )}
          <div className="flex justify-between items-center text-center w-2/3">
            <p className="font-bold text-lg text-right w-28 py-4">Package</p>
            <div className="text-left mt-6">
              <p>5tk per Invoice</p>
              <p>Max - 2000tk a month</p>
            </div>
          </div>

          {/* Security and Password */}
          <div className="flex justify-between items-center text-center w-full">
            <p className="font-bold text-lg text-right w-28 py-4">Security</p>
          </div>
          <div className="flex space-x-4 justify-start items-center">
            <p className="w-28 text-right">OTP</p>
            <input value="01723939836" disabled={true} className="px-4 py-1 w-80 text-center" />
          </div>
          <div className="flex justify-start ml-32 items-center text-center w-full">
            <button className="font-bold text-nowrap bg-blue-gray-400 text-white w-auto px-4 py-1 rounded-md text-left">
              Change Password
            </button>
          </div>

          {/* Test List */}
          <div className="flex justify-start space-x-4 items-center text-center w-full">
            <p className="font-bold text-lg text-right w-28 py-4">Test List</p>
            <Link to="/testlist" className="font-bold text-nowrap bg-blue-gray-400 text-white w-auto px-4 py-1 rounded-md text-right">
              Manage Test and Price
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile