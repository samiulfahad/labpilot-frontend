/** @format */

import { useState } from "react";

const InvoiceData = (props) => {
  const { total, discount, afterDiscount, adjustment, netAmount, paid, hasDiscount, discounter } = props.data;
  const due = netAmount - paid;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl text-center font-semibold mb-4">Invoice Summary</h2>
      <div className="flex justify-between mb-2">
        <p className="text-gray-700">মোট:</p>
        <p className="font-semibold">{total} টাকা</p>
      </div>

      <div className="flex justify-start space-x-4 items-center">
        <p className="text-sm">ডাক্তার বা রেফারেন্সকারী ডিস্কাউন্ট দিয়েছে কি?</p>
        <button
          onClick={() => props.onDiscount({ hasDiscount: false })}
          className={`${!hasDiscount ? "px-2 py-1 bg-blue-gray-500 text-white" : "text-gray-500"}`}
        >
          না
        </button>
        <button
          onClick={() => props.onDiscount({ hasDiscount: true })}
          className={`${hasDiscount ? "px-2 py-1 bg-blue-gray-500 text-white" : "text-gray-500"}`}
        >
          হ্যাঁ
        </button>
      </div>

      {hasDiscount && (
        <>
          <div className="flex justify-between text-sm mb-2 items-center">
            <label htmlFor="discount" className="text-gray-700">
              ডিস্কাউন্ট:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="discount"
                className="p-1 w-20 text-right border border-gray-300 rounded-md mr-2"
                value={discount}
                onChange={(e) => props.onDiscount({ discount: parseFloat(e.target.value) })}
              />
              <span>%</span>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <p className="text-gray-700">ডিস্কাউন্ট পরবর্তী মূল্য:</p>
            <p className="font-semibold">{afterDiscount} টাকা</p>
          </div>
        </>
      )}

      <div className="flex justify-between mb-2 text-sm items-center">
        <label htmlFor="adjustment" className="text-gray-700">
          ল্যাব প্রদত্ত ছাড়:
        </label>
        <div className="flex items-center">
          <input
            type="number"
            className="p-1 border w-20 text-right border-gray-300 rounded-md mr-2"
            value={adjustment}
            onChange={(e) => props.onAdjustment(parseFloat(e.target.value) || 0)}
          />
          <span>টাকা</span>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-gray-700 text-md font-semibold">Net Amount:</p>
        <p className="font-semibold text-md">{netAmount} টাকা</p>
      </div>
      <hr className="my-2 border-t border-gray-300" />
      <div className="flex justify-between mb-2 items-center">
        <label htmlFor="paid" className="text-gray-700">
          নগদ:
        </label>
        <div className="flex items-center">
          <input
            type="number"
            className="p-1 border w-20 text-right border-gray-300 rounded-md mr-2"
            value={paid}
            onChange={(e) => props.onPay(parseFloat(e.target.value) || 0)}
          />
          <span>টাকা</span>
        </div>
      </div>

      <div className="flex justify-between text-red-700 mb-2">
        <p className="font-semibold">বাকি:</p>
        <p className="font-semibold">{due} টাকা</p>
      </div>
    </div>
  );
};

export default InvoiceData;
