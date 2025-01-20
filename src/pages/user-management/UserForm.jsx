import React from "react";

const UserForm = () => {
  return (
    <div>
      <form className="md:pl-20 mt-10 flex space-y-2 flex-col md:w-1/2">
        {/* Login Info */}
        <div>
          <p className="text-lg font-bold text-black">Login Info</p>
        </div>
        <div className="flex justify-between items-center ">
          <p>Username</p>
          <input className="px-2 py-1 border-none focus:outline-none" />
        </div>

        <div className="flex justify-between items-center ">
          <p>Password</p>
          <input className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center ">
          <p>Email</p>
          <input
            type="email"
            className="px-2 py-1 border-none focus:outline-none"
          />
        </div>

        {/* Rules */}

        <div>
          <p className="text-lg font-bold text-black">Power</p>
        </div>
        <div className="flex space-x-2">
          <input type="checkbox" value="invoive" />
          <p>Create Invoice</p>
        </div>
        <div className="flex space-x-2">
          <input type="checkbox" value="invoive" />
          <p>Delete Invoice</p>
        </div>
        <div className="flex space-x-2">
          <input type="checkbox" value="invoive" />
          <p>Upload Reports</p>
        </div>

        <div className="flex space-x-2">
          <input type="checkbox" value="invoive" />
          <p>Access Commission Tracker</p>
        </div>
        <div className="flex space-x-2">
          <input type="checkbox" value="invoive" />
          <p>Access Cashmemo</p>
        </div>

        <div className="flex space-x-2">
          <input type="checkbox" value="invoive" />
          <p>Manage Referrers</p>
        </div>

        {/* Personal Info */}
        <div>
          <p className="text-lg font-bold text-black">Personal Info</p>
        </div>
        <div className="flex justify-between items-center ">
          <p>Name</p>
          <input className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p> Contact No.</p>
          <input className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p>NID Card No.</p>
          <input className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p> Designation</p>
          <input className="px-2 py-1 border-none focus:outline-none" />
        </div>
        <div className="flex justify-between items-center">
          <p> Joining Date</p>
          <input
            type="date"
            className="px-2 py-1 border-none focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
