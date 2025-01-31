/** @format */

export const referrerList = [
  {
    name: "Self",
    isDoctor: true,
    type: "percentage",
    discountAmount: 0,
    id: "self",
  },
  {
    name: "Dr. Percentage",
    isDoctor: true,
    type: "percentage",
    discountAmount: 20,
    id: "6713cfd0c99821db8ccc3570",
  },
  {
    name: "Dr. Fix",
    isDoctor: true,
    type: "fixed",
    discountAmount: 30,
    id: "234",
  },
  {
    name: "Medical Unit, NIT Durgapur",
    isDoctor: false,
    type: "fixed",
    discountAmount: 0,
    id: "738039",
  },
];

export const testList = [
  { name: "CBC", code: "t1", price: 300 },
  { name: "RBS", code: "t2", price: 400 },
  { name: "ECG", code: "t3", price: 500 },
  { name: "Ultra", code: "t4", price: 200 },
  { name: "X-ray", code: "t5", price: 600 },
  { name: "Echo", code: "t6", price: 100 },
];


export const checkedTest = [
  {
    name: "Test One",
    code: "t1",
    price: 300,
  },
  {
    name: "Test Two",
    code: "t2",
    price: 400,
  },
  {
    name: "Test Three",
    code: "t3",
    price: 600,
  },
  {
    name: "Test Four",
    code: "t4",
    price: 350,
  },
  {
    name: "Test Five",
    code: "t5",
    price: 350,
  },
  {
    name: "Test Six",
    code: "t6",
    price: 800,
  },
  {
    name: "Test Seven",
    code: "t7",
    price: 300,
  },
  {
    name: "Test Eight",
    code: "t8",
    price: 1200,
  },
  {
    name: "Test Nine",
    code: "t9",
    price: 1300,
  },
  {
    name: "Test Ten",
    code: "t10",
    price: 100,
  },
];

export const invoices = [
  {
    id: 1234567,
    due: 200,
    adjustment: 50,
  },
  {
    id: 7774567,
    due: 200,
    adjustment: 50,
  },
  {
    id: 5784567,
    due: 200,
    adjustment: 50,
  },
  {
    id: 1804567,
    due: 200,
    adjustment: 50,
  },
  {
    id: 7994567,
    due: 200,
    adjustment: 50,
  },
];

export const InvoiceTableHead = ["Invoice ID", "Amount", "Delivery", "View", "Edit"];

export const InvoiceTableRow = [
  {
    id: 787878,
    total: 890,
    due: 500,
  },
  {
    id: 1223878,
    total: 1000,
    due: 700,
  },
  {
    id: 999911,
    total: 2000,
    due: 100,
  },
  {
    id: 767890,
    total: 3000,
    due: 100,
  }
];
