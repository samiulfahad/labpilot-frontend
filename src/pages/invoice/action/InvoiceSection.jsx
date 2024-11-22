/** @format */

import React from "react";
import InvoiceDate from "./InvoiceDate";

const InvoiceSection = (props) => {
  const invoice = props.invoice;
  return (
    <div className="flex flex-col justify-between items-start space-y-2">
      {/* Invoice ID */}
      <div className="flex w-full justify-between items-center">
        <p>Invoice ID</p>
        <p className="font-bold text-black">{invoice.invoiceId || ""}</p>
      </div>

      {/* Invoice Date */}
      <div className="flex w-full justify-between items-center">
        <p>Date</p>
        <p className="font-bold pl-2 text-black">
          <InvoiceDate dateString={invoice.invoiceId || ""} />
        </p>
      </div>

      {/* Referrer */}
      <div className="flex w-full justify-between items-center">
        <p>Referrer</p>
        <p className="font-bold text-black">{invoice.referrerId || ""}</p>
      </div>

      {/* Total */}
      <div className="flex w-full justify-between items-center">
        <p>Total</p>
        <p className="font-bold text-black">{invoice.total || ""} Taka</p>
      </div>
      {/* Referrer Discount */}
      <div className="flex w-full justify-between items-center">
        <p>Referrer Discount</p>
        <p className="font-bold text-black">
          {invoice.discount === 0
            ? "0"
            : `${invoice.discount}${invoice.discountType === "percentage" ? " %" : " Taka"}`}
        </p>
      </div>

      {/* Lab Adjustment */}
      <div className="flex w-full justify-between items-center">
        <p>Lab Discount</p>
        <p className="font-bold text-black"> {invoice.labAdjustment === 0 ? "0" : invoice.discount + " Taka"}</p>
      </div>

      {/* Net Amount */}
      <div className="flex w-full justify-between items-center">
        <p>Net Amount</p>
        <p className="font-bold text-black">{invoice.netAmount || ""} Taka</p>
      </div>

      {/* Payment */}
      <div className="flex w-full justify-between items-center">
        <p>Payment</p>
        <div>
          {invoice?.netAmount === invoice.paid && (
            <p className="text-right w-full font-bold text-green-500">Fully Paid</p>
          )}

          {invoice?.netAmount > invoice.paid && (
            <p className="text-right w-full font-bold text-red-500">
              {" "}
              <span className="text-black font-light">Paid - {invoice?.paid}, </span> Due-{" "}
              {invoice?.netAmount - invoice?.paid}
            </p>
          )}
        </div>
      </div>

      {/* Total Test */}
      <div className="flex w-full justify-between items-center">
        <p>Total Test </p>
        <p className="font-bold text-black"> {invoice?.testList?.length || ""} <span className="font-normal text-sm">(Online - 5, Offline - 3)</span></p>
      </div>
    </div>
  );
};

export default InvoiceSection;
