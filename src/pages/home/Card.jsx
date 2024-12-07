/** @format */

import React from "react";

const Card = ({cashMemo, title}) => {
  return (
    <div>
      <div className="ml-32 text-lg w-[600px] bg-white shadow-lg p-6 rounded-md mt-4">
        <p className="text-center text-xl font-bold">{ title ? title : "Cash Memo" }</p>
        <div className="flex justify-between items-center w-full my-4">
          <p>Today's Total Invoices</p>
          <p> {cashMemo.totalInvoice}</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <p>Total Sale</p>
          <p>{cashMemo.totalSale}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p>Total Lab Discount</p>
          <p> {cashMemo.totalLabAdjustment}</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <p>Total Referrers Discount</p>
          <p> {cashMemo.totalReferrerDiscount}</p>
        </div>

        <div className="flex justify-between items-center w-full mt-4">
          <p>Net Sale (Total Sale - Discount)</p>
          <p> {cashMemo.totalNetAmount}</p>
        </div>

        <div className="flex  mt-4 justify-between items-center w-full">
          <p> Total Received </p>
          <p> {cashMemo.totalReceived}</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <p> Total Due </p>
          <p> {cashMemo.totalNetAmount - cashMemo.totalReceived}</p>
        </div>

        <div className="flex text-sm justify-between items-center w-full mt-4">
          <p>Total Commission</p>
          <p> {cashMemo.totalCommission}</p>
        </div>
        <div className="flex text-sm justify-between items-center w-full">
          <p>Final Receiving Amount</p>
          <p> {cashMemo.totalNetAmount - cashMemo.totalCommission}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
