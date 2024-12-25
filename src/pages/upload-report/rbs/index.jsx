/** @format */

import { useState } from "react";
import { useLocation } from "react-router-dom";

const index = () => {
  const [active, setActive] = useState("all")
  
  const { code, id } = useLocation().state;
  console.log(code, id);
  const data = [
    { id: 1, invoiceId: "INV-001" },
    { id: 2, invoiceId: "INV-002" },
    { id: 3, invoiceId: "INV-003" },
  ];

  return (
      <section className="py-8 bg-gray-50 min-h-screen">
          <div className="flex space-x-2 justify-center items-center w-full">
              <button className="btn-sm">All</button>
              <button className="btn-sm !bg-white !text-blue-gray-800">Completed</button>
              <button className="btn-sm !bg-white !text-blue-gray-800">Incompleted</button>
          </div>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-800 border-b border-gray-300">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800 border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">
                      {row.invoiceId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-gray-600 text-white rounded-md shadow-sm hover:bg-blue-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          Upload Data
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                          Print
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
