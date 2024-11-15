import React from "react"

const TestTable = ({tests}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="">
          <th className="p-1 font-semibold text-base text-left text-black">#</th>
          <th className="p-1 pl-0 font-semibold text-base text-left text-black">টেস্টের নাম</th>
          <th className="p-1 pr-2 font-bold text-base  text-black text-right">মূল্য</th>
        </tr>
      </thead>
      <tbody>
        {/* Render test rows */}
        {tests.map((test, index) => (
          <tr key={index} className="">
            <td className="font-semibold text-[12px] text-gray-800">{index + 1}</td>
            <td className="font-semibold text-[12px] text-gray-800">{test.name}</td>
            <td className="font-semibold text-[12px] text-gray-800 text-right">৳ {test.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TestTable
