/** @format */

import React from "react";
import PatientData from "./PatientData";
import LabData from "./LabData";
import QRCode from "./QRCode";
import TestTable from "./TestTable";
import AmountTable from "./AmountTable";

const PrintReceipt = () => {
  const tests = [
    {
      name: "Test One",
      code: "t1",
      price: 300,
    },
    {
      name: "Test Two",
      code: "t2",
      price: 400,
    },
    {
      name: "Test Three",
      code: "t3",
      price: 600,
    },
    {
      name: "Test Four",
      code: "t4",
      price: 350,
    },
    {
      name: "Test Five",
      code: "t5",
      price: 350,
    },
    {
      name: "Test Six",
      code: "t6",
      price: 800,
    },
    {
      name: "Test Seven",
      code: "t7",
      price: 300,
    },
    {
      name: "Test Eight",
      code: "t8",
      price: 1200,
    },
    {
      name: "Test Nine",
      code: "t9",
      price: 1300,
    },
    {
      name: "Test Ten",
      code: "t10",
      price: 100,
    },
  ];
  return (
    <section className="print max-w-xl px-10 mx-auto pt-3 min-h-screen">
      <button
        onClick={() => window.print()}
        className="btn mx-auto w-40 flex justify-center items-center my-4"
      >
        Print Invoice
      </button>

      <LabData />
      <hr className="border-1 py-1 border-blue-gray-600" />
      <PatientData />
      <TestTable tests={tests} />
      <div className="flex items-center justify-between border-b-[1px] border-t-[1px] border-blue-gray-600"></div>
      <div className="flex items-start justify-end">
        {/* <QRCode /> */}
        <AmountTable />
      </div>
      <div className="w-full flex justify-between items-center mt-[80px]">
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