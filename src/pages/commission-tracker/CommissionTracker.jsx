/** @format */

import React from "react";
import { Link } from "react-router-dom";

const CommissionTracker = () => {
  const list = [1, 3, 4, 5];
  return (
    <div className="overflow-x-auto w-4/5 mx-auto">
      <table className="min-w-full bg-white text-blue-gray-800 border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">SL No.</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Name</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Total Invoice</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Commission</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Details</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100`}>
              <td className="px-4 py-2 text-sm">{1}</td>
              <td className="px-4 py-2 text-sm">{"Ratul"}</td>
              <td className="px-4 py-2 text-sm">{5}</td>
              <td className="px-4 py-2 text-sm">{2000}</td>
              <td className="px-4 py-2 text-sm">
                <Link
                  to={"/invoice/action/"}
                  className="px-3 py-1 text-white bg-blue-gray-800 hover:bg-blue-gray-600 rounded text-sm"
                >
                  List
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionTracker;
