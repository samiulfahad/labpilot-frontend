/** @format */

import React from "react";
import { invoices, InvoiceTableHead, InvoiceTableRow } from "../../../data";
import Table from "./Table";

const AllInvoices = () => {
  return (
    <div className="w-4/5 mx-auto mt-4">
      <Table head={InvoiceTableHead} rows={InvoiceTableRow} />
    </div>
  );
};

export default AllInvoices;
