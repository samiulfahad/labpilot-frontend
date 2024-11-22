/** @format */

import React from "react";
import ConvertDate from "../action/ConvertDate";

const PatidentData = ({ name, age, contact, doctorName, date, invoiceId }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div>
        <p className="text-[14px] text-black">নামঃ {name}</p>
        <p className="text-[14px] text-black">বয়সঃ {age}</p>
        <p className="text-[14px] text-black">মোবাইলঃ {contact}</p>
      </div>
      <div>
        <p className="text-[12px] text-black">Invoice ID: {invoiceId}</p>
        <p className="text-[12px] text-black">তারিখঃ <ConvertDate dateString={invoiceId}/> </p>
        <p className="text-[12px] text-black">ডাক্তার: {doctorName}</p>
      </div>
    </div>
  );
};

export default PatidentData;
