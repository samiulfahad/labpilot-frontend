/** @format */

import React from "react";
import { Link } from "react-router-dom";

const CommissionTracker = ({ list, startDate, endDate, formattedDate }) => {
  return (
    <div className="overflow-x-auto w-4/5 mx-auto">
      <div className="text-lg font-bold text-center">Commission Tracker</div>
      <div className="text-sm font-bold text-center">{ formattedDate }</div>
      <table className="min-w-full bg-white text-blue-gray-800 border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">SL No.</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Name</th>
            {list.length !== 0 && list[0].totalInvoice && (
              <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Invoice</th>
            )}
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Test Count</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Commission</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Details</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100`}>
              <td className="px-4 py-2 text-sm">{1 + index}</td>
              <td className="px-4 py-2 text-sm">{item.name}</td>
              {list.length !== 0 && list[0].totalInvoice && <td className="px-4 py-2 text-sm">{item.totalInvoice}</td>}
              <td className="px-4 py-2 text-sm">
                <div className="flex space-x-2 text-sm justify-start items-center">
                  {item.testList.map((test, index) => {
                    const isLast = index + 1 == item.testList.length;
                    if (!isLast) {
                      return (
                        <p key={index}>
                          {" "}
                          {test.testName}-{test.total},
                        </p>
                      );
                    } else {
                      return (
                        <p key={index}>
                          {test.testName}-{test.total}
                        </p>
                      );
                    }
                  })}
                </div>
              </td>
              <td className="px-4 py-2 text-sm">{item.totalCommission}</td>
              <td className="px-4 py-2 text-sm">
                <Link
                  state={{list: "invoicesByReferrer", startDate, endDate, formattedDate, referrerId: item.referrerId, referrerName: item.name}}
                  to={"/render-list"}
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
