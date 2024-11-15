import { useState } from "react";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NewInvoice from "./pages/invoice/new";
import AllInvoices from "./pages/invoice/all"
import LabTest from "./pages/lab-test"
import Modal from "./components/modal"
import PrintReceipt from "./pages/invoice/print";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/new" element={<NewInvoice />} />
        <Route path="/invoice/all" element={<AllInvoices />} />
        <Route path="/invoice/print" element={<PrintReceipt />} />
        <Route path="/lab-test" element={<LabTest />} />
        <Route path="/modal" element={<Modal type="processing" title="Creating invoice. Please wait"/>} />

      </Routes>
    </Layout>
  );
}

export default App;
