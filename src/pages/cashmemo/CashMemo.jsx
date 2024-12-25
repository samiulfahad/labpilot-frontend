/** @format */

import React from "react";

const CashMemo = ({ cashMemo, formattedDate }) => {
  return (
    <div>
      <div className="w-[500px] shadow-2xl rounded-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-gray-300 to-blue-gray-700 text-white py-6 px-8">
          <p className="text-center text-2xl font-bold">Cash Memo</p>
          <p className="text-center text-sm font-bold">{ formattedDate }</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-2">
          {/* Invoice and Sales */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Today's Total Invoices</p>
            <p className="text-gray-900 font-bold">{cashMemo.totalInvoice}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Total Sale</p>
            <p className="text-gray-900 font-bold">{cashMemo.totalSale}</p>
          </div>

          {/* Discounts */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Total Lab Discount</p>
            <p className="text-gray-900 font-semibold">{cashMemo.totalLabAdjustment}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Total Referrers Discount</p>
            <p className="text-gray-900 font-semibold">{cashMemo.totalReferrerDiscount}</p>
          </div>

          {/* Net Sale */}
          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <p className="text-gray-700 font-medium">Net Sale (Total Sale - Discount)</p>
            <p className="text-gray-900 font-bold">{cashMemo.totalNetAmount}</p>
          </div>

          {/* Received and Due */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Total Received</p>
            <p className="text-green-600 font-bold">{cashMemo.totalReceived}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Total Due</p>
            <p className="text-red-600 font-bold">
              {cashMemo.totalNetAmount - cashMemo.totalReceived}
            </p>
          </div>

          {/* Commission */}
          <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-sm">
            <p className="text-gray-600">Total Commission</p>
            <p className="text-gray-800">{cashMemo.totalCommission}</p>
          </div>

          {/* Final Receiving */}
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">Final Receiving Amount</p>
            <p className="text-gray-800 font-semibold">
              {cashMemo.totalNetAmount - cashMemo.totalCommission}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashMemo;
