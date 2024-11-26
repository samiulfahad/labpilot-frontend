/** @format */

import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NewInvoice from "./pages/invoice/new";
import AllInvoices from "./pages/invoice/all";
import LabTest from "./pages/testlist";
import Modal from "./components/modal";
import PrintReceipt from "./pages/invoice/print";
import SendSMS from "./pages/send-sms";
import Action from "./pages/invoice/action";
import Recharge from "./pages/recharge";
import UpdateTestList from "./pages/update-testlist";
import { Profile } from "./pages/profile";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/new" element={<NewInvoice />} />
        <Route path="/invoice/print" element={<PrintReceipt />} />
        <Route path="/invoice/all" element={<AllInvoices />} />
        <Route path="/invoice/action" element={<Action />} />

        <Route path="/testlist" element={<LabTest />} />
        <Route path="/testlist/update" element={<UpdateTestList />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/send-sms" element={<SendSMS />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/modal" element={<Modal type="processing" title="Creating invoice. Please wait" />} />
      </Routes>
    </Layout>
  );
}

export default App;
