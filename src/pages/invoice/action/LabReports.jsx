/** @format */

import React from "react";
import { Link } from "react-router-dom";

const LabReports = (props) => {
  const invoice = props.invoice;
  return (
    <div>
      <p className="text-center mt-4 mb-4 text-xl font-bold -ml-20">Lab Reports</p>
      <div className="w-1/3 mx-auto mb-20">
        <div className="flex space-x-2 justify-start items-center">
          <p className="font-bold text-black">Offline Test List: </p>
          {invoice?.testList?.map((item, index) => (
            <p key={index} className="font-bold">
              {item.name}
              {index !== invoice.testList.length - 1 && ","}
            </p>
          ))}
        </div>
        <p className="font-bold text-md text-start text-black py-2">Online Test List</p>
        <div className="flex flex-col gap-4 justify-between items-between">
          <div className="flex justify-between items-center space-x-8">
            <p>XRay (P/A View)</p>
            <Link className="bg-blue-gray-700 text-white px-2 py-1 text-sm">Print Report</Link>
          </div>

          <div className="flex justify-between items-center space-x-8">
            <p>XRay</p>
            <Link className="bg-blue-gray-700 text-white px-2 py-1 text-sm">Print Report</Link>
          </div>

          <div className="flex justify-between items-center space-x-8">
            <p>CBC</p>
            <Link className="bgColor text-gray-300 px-2 py-1 text-sm">Upload Report</Link>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <p>CBC</p>
            <Link className="bgColor text-gray-300 px-2 py-1 text-sm">Upload Report</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReports;
