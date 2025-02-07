import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, LAB_V1 } from "../../../config";
import axios from "axios";
import Modal from "../../components/modal";
import Table from "./Table";

const StaffManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const getStaffList = async () => {
    try {
      setStatus("processing");
      setMsg("Loading Data.....");
      const response = await axios.get(API_URL + LAB_V1 + "/staffs");
      if (response.data.success) {
        setStaffs(response.data.staffs);
        setStatus("");
        setMsg("");
        // console.log(response.data.staffs)
      } else {
        setStaffs([]);
        setStatus("error");
        setMsg("Something went wrong. Please refresh the page");
      }
    } catch (e) {
      setStaffs([]);
      setStatus("error");
      setMsg("Something went wrong. Please refresh the page");
      console.log(e);
    }
  };

  useEffect(() => {
    getStaffList();
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
          <Link to="/staff-management/form" state={{ page: "addStaff" }} className="btn-md mt-10">
            Add New Staff
          </Link>
        </div>
        <div className="w-full">
          <Table list={staffs}/>
        </div>
      </div>
    </section>
  );
};

export default StaffManagement;
