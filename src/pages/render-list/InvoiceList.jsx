/** @format */

import React from "react";

const InvoiceList = ({ list }) => {
  return (
    <div className="overflow-x-auto w-4/5 mt-8 mx-auto">
      <table className="min-w-full bg-white text-blue-gray-800 border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">SL No.</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Lab Discount</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Referrer Discount</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Net Amount</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Due</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Commission</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100`}>
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm">{item.invoiceId}</td>
              <td className="px-4 py-2 text-sm">{item.labAdjustment}</td>
              <td className="px-4 py-2 text-sm">{item.discount}</td>
              <td className="px-4 py-2 text-sm">{item.netAmount}</td>
              <td className="px-4 py-2 text-sm">{item.netAmount - item.paid}</td>
              <td className="px-4 py-2 text-sm">{item.commission}</td>
              <td className="px-4 py-2 text-sm">
                <button className="px-3 py-1 text-white bg-blue-gray-800 hover:bg-blue-gray-600 rounded text-sm">Action</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
