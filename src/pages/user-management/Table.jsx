/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { ACCESS_CONTROL } from "../../../config";
const Table = ({ list }) => {
  
  return (
    <div className="overflow-x-auto w-4/5 mt-8 mx-auto">
      <table className="min-w-full bg-white text-blue-gray-800 border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">SL No.</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Username</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Access</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Edit</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Terminate</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100`}>
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm">{item.username}</td>
              <td className="px-4 py-2 text-sm">{item.accessControl.map(role=><p key={role}>{ACCESS_CONTROL[role] || "Something went wrong"}</p>)}</td>
              <td className="px-4 py-2 text-sm">
                <Link to={"/invoice/action/"} state={{ _id: item._id }} className="px-3 py-1 text-white bg-blue-gray-800 hover:bg-blue-gray-600 rounded text-sm">Edit</Link>
              </td>
              <td className="px-4 py-2 text-sm">
                <Link to={"/invoice/action/"} state={{ _id: item._id }} className="px-3 py-1 text-white bg-red-800 hover:bg-red-600 rounded text-sm">Terminate</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
