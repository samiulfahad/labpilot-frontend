import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto w-full p-6">
      <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-xl">
        <thead className="bg-gradient-to-r from-blue-gray-500 to-indigo-500 text-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 border-b border-gray-300 text-left text-lg font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-3 border-b border-gray-300 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table