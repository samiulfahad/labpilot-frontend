/** @format */

import React from "react";

const AmountTable = ({ total, discount, discountType, labAdjustment, paid }) => {
  let percentDiscount= 0
  if (discountType === "percentage") {
    percentDiscount = discount
    discount = (discount * total) / 100;
  }
  return (
    <div className="w-2/3">
      <table className="w-full mt-2">
        <tbody>
          <tr>
            <td className="text-[13px] text-black">মোট</td>
            <td className="text-base text-black text-right">৳ {total}</td>
          </tr>

          {discount !== 0 && (
            <tr>
              <td className="text-[13px] text-black">
                ডিস্কাউন্ট {discountType === "percentage" ? `(${percentDiscount}%)` : null}
              </td>
              <td className="text-base text-black text-right">- ৳ {discount}</td>
            </tr>
          )}
          {labAdjustment !== 0 && (
            <tr>
              <td className="text-[13px] text-black">Adjustment</td>
              <td className="text-base text-black text-right">- ৳ {labAdjustment}</td>
            </tr>
          )}

          {(discount !== 0 || labAdjustment !== 0) && (
            <tr>
              <td className="text-[14px] font-bold text-base text-black">Net Amount: </td>
              <td className="text-[14px] font-bold text-base text-black text-right">
                ৳ {total - discount - labAdjustment}
              </td>
            </tr>
          )}

          <tr>
            <td className="text-[11px] text-base text-gray-900">নগদ</td>
            <td className="text-[11px] text-base text-black text-right">৳ {paid}</td>
          </tr>

          <tr>
            <td className="text-[11px] font-bold text-base text-gray-900">বাকি</td>
            <td className="text-[11px] font-bold text-base text-black text-right">
              ৳ {total - discount - labAdjustment - paid}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AmountTable;
