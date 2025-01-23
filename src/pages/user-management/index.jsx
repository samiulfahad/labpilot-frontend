import React from "react";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const users = [
    { name: "hamza", rules: ["invoice", "report-upload"] },
    { name: "Amir", rules: ["report-upload"] },
  ];
  return (
    <section>
      <div className="flex flex-col w-full justify-start items-center">
        <div className="flex justify-center items-center w-full mx-auto">
          <Link to="/user-management/user-form" state={{page: "addUser"}} className="btn-sm mt-10">Add New User</Link>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default UserManagement;
