import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";
import axios from "axios";
import Modal from "../../components/modal";
import Table from "./Table";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const getUsers = async () => {
    try {
      setStatus("processing");
      setMsg("Loading Data.....");
      const response = await axios.get(API_URL + "/api/v1/user/users");
      if (response.data.success) {
        setUsers(response.data.users);
        setStatus("");
        setMsg("");
        console.log(response.data.users)
      } else {
        setUsers([]);
        setStatus("error");
        setMsg("Something went wrong. Please refresh the page");
      }
    } catch (e) {
      setUsers([]);
      setStatus("error");
      setMsg("Something went wrong. Please refresh the page");
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const closeModal = () => {
    setMsg("");
    setStatus("");
  };
  return (
    <section>
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {status === "processing" && <Modal type="processing" title={msg} />}
      <div className="flex flex-col w-full justify-start items-center">
        <div className="flex justify-center items-center w-full mx-auto">
          <Link to="/user-management/user-form" state={{ page: "addUser" }} className="btn-md mt-10">
            Add New User
          </Link>
        </div>
        <div className="w-full">
          <Table list={users}/>
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
