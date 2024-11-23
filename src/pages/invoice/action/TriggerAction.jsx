/** @format */

import React from "react";

const Actions = (props) => {
    const invoice = props.invoice
  return (
    <div>
      <p className="text-center w-full text-xl text-blue-gray-600">Actions</p>

      <div className="py-1">
        {invoice.paid === invoice.netAmount ? (
          <div className="flex justify-between items-center">
            <p className="text-left text-green-600">সম্পূর্ণ টাকা পরিশোধিত </p>
            <p className="font-bold pr-2">Done</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-red-400 font-bold">
              {" "}
              <span className="text-blue-gray-700">Paid- {invoice.paid}, </span> Due {invoice.netAmount - invoice.paid}
            </p>
            <button onClick={()=> props.onAction("payment")} className="btn-sm w-24">Collect</button>
          </div>
        )}
      </div>
      <div className="py-1">
        {invoice.notified ? (
          <div className="flex justify-between items-center">
            <p className="text-left text-green-600">রিপোর্ট সংগ্রহের জন্য মেসেজ পাঠানো হয়েছে </p>
            <p className="font-bold pr-2">Done</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-red-400 font-bold">রিপোর্ট সংগ্রহের জন্য মেসেজ দিন</p>
            <button onClick={()=> props.onAction("sendSMS")} className="btn-sm w-24">Send SMS</button>
          </div>
        )}
      </div>

      <div className="py-1">
        {invoice.delivered ? (
          <div className="flex justify-between items-center">
            <p className="text-left text-green-600 font-bold">Report Delivery Complete</p>
            <p className="font-bold pr-2">Done</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>রিপোর্ট ডেলিভারি দেওয়া হয়নি।</p>
            <button onClick={()=> props.onAction("reportDelivery")} className="btn-sm w-24">Deliver</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actions;
