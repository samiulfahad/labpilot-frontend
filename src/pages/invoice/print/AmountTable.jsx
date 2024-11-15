import React from "react"

const AmountTable = () => {
  return (
    <div className="w-2/3">
      <table className="w-full mt-2 border-b-[1px] border-blue-gray-400">
        <tbody>
          <tr>
            <td className="text-[13px] text-black">মোট</td>
            <td className="text-base text-black text-right">৳2900.00</td>
          </tr>

          <tr>
            <td className="text-[13px] text-black">30% ডিস্কাউন্টের পর</td>
            <td className="text-base text-black text-right">৳2900.00</td>
          </tr>
          <tr>
            <td className="text-[13px] text-black">Adjustment</td>
            <td className="text-base text-black text-right">৳2900.00</td>
          </tr>
          <tr className="bg-blue-gray-400">
            <td className="text-[14px] font-bold text-base text-black">সর্বমোট</td>
            <td className="text-[14px] font-bold text-base text-black text-right">৳2900.00</td>
          </tr>

          <tr>
            <td className="text-[11px] text-base text-gray-900">নগদ</td>
            <td className="text-[11px] text-base text-black text-right">৳2900.00</td>
          </tr>

          <tr className="bg-blue-gray-400">
            <td className="text-[11px] font-bold text-base text-gray-900">বাকি</td>
            <td className="text-[11px] font-bold text-base text-black text-right">৳2900.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AmountTable
