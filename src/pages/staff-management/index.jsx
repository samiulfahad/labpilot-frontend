// StaffManagement.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, LAB_V1 } from "../../../config";
import axios from "axios";
import Modal from "../../components/modal";
import Table from "./Table";

const StaffManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [staff, setStaff] = useState({});
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

  const showTerminateModal = (staff) => {
    setStatus("terminate");
    setMsg(
      "আপনি কি নিচের Staff কে Deactivate / Delete করতে চান? Deactivate করলে পরবর্তীতে আবার Active করা যাবে। কিন্তু কোনো Staff Account একবার Delete করলে পরবর্তীতে আর Active করা যাবেনা"
    );
    setStaff(staff);
  };

  const reloadPage = () => {
    getStaffList();
    closeModal();
  };

  const handleTerminate = async (action, staffParam) => {
    setStatus("processing");
    if (action === "reactivate") {
      setMsg("Reactivating Staff... Please wait.");
    } else {
      setMsg("Processing... Please wait.");
    }
    try {
      const staffId = staffParam ? staffParam._id : staff._id;
      let response = await axios.patch(API_URL + LAB_V1 + "/staff-management/terminate", {
        staffId,
        action,
      });
      if (response.data.success) {
        setStatus("success");
        setMsg(
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="text-green-500 font-bold">Request Completed Successfully</p>
            <button className="btn-sm" onClick={reloadPage}>
              Reload Now
            </button>
          </div>
        );
      } else {
        setMsg("Something went wrong. please refresh the page");
        setStatus("error");
      }
    } catch (e) {
      setMsg("Something went wrong. please refresh the page");
      setStatus("error");
      console.log(e);
    }
  };

  const handleReactivate = (staff) => {
    handleTerminate("reactivate", staff);
  };

  const closeModal = () => {
    setMsg("");
    setStatus("");
  };

  return (
    <section>
      {status === "error" && <Modal type="error" title={msg} onClose={closeModal} />}
      {status === "success" && <Modal type="success" title={msg} />}
      {status === "terminate" && (
        <Modal type="terminate" title={msg} staff={staff} onSubmit={handleTerminate} onClosingModal={closeModal} />
      )}
      {status === "processing" && <Modal type="processing" title={msg} />}
      <div className="flex flex-col w-full justify-start items-center">
        <div className="flex justify-center items-center w-full mx-auto">
          <Link to="/staff-management/form" state={{ page: "addStaff" }} className="btn-md mt-10">
            Add New Staff
          </Link>
        </div>
        <div className="w-full">
          <Table list={staffs} onShowTerminateModal={showTerminateModal} onReactivate={handleReactivate} />
        </div>
      </div>
    </section>
  );
};

export default StaffManagement;