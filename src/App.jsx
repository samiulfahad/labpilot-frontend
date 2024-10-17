import { useState } from "react";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NewInvoice from "./pages/invoice/new";
import LabTest from "./pages/lab-test"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/new" element={<NewInvoice/>} />
        <Route path="/lab-test" element={<LabTest/>} />

      </Routes>
    </Layout>
  );
}

export default App;
