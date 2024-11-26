/** @format */

import React, { useEffect } from "react";
import PatientData from "./PatientData";
import LabData from "./LabData";
import QRCode from "./QRCode";
import TestTable from "./TestTable";
import AmountTable from "./AmountTable";
import { useLocation, useNavigate } from "react-router-dom";

const PrintReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely access state with a fallback
  const state = location?.state || {};
  const { patientData, invoiceData, successMsg } = state;

  useEffect(() => {
    if (!patientData || !invoiceData) {
      navigate("/invoice/new");
    }
  }, [location]);

  if (!patientData || !invoiceData) {
    return null;
  }

  return (
    <section className="print relative max-w-xl px-10 mx-auto pt-3 min-h-screen">
      {successMsg && <p className="hide py-2 text-center flex justify-center items-center">{successMsg}</p>}
      <button onClick={() => window.print()} className="btn mx-auto w-40 flex justify-center items-center my-4">
        Print Invoice
      </button>

      <LabData />
      <hr className="border-1 py-1 border-black" />
      <PatientData
        name={patientData.name}
        age={patientData.age}
        contact={patientData.contact}
        doctorName={patientData.doctorName}
        invoiceId={invoiceData.invoiceId}
      />
      <TestTable tests={invoiceData.testList} />
      <div className="flex items-center justify-between border-b-[1px] border-t-[1px] border-black"></div>
      <div className="flex items-start justify-end">
        {/* <QRCode /> */}
        <AmountTable
          total={invoiceData.total}
          discount={invoiceData.discount}
          discountType={invoiceData.discountType}
          labAdjustment={invoiceData.labAdjustment}
          paid={invoiceData.paid}
        />
      </div>
      <div className="absolute bottom-3 left-0 right-0 w-full flex justify-between items-center mt-[80px]">
        <p className="font-bold text-sm text-left text-gray-400">
          Managed by <a href="">Lab-Pilot.com</a>
        </p>
        <div className="w-40 h-1 border-t-[1px] border-black ml-auto">
          <p className="text-base text-black text-center">Signature</p>
        </div>
      </div>
    </section>
  );
};

export default PrintReceipt;
