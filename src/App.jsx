/** @format */

import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NewInvoice from "./pages/invoice/new";
import AllInvoices from "./pages/invoice/all";
import TestList from "./pages/testlist";
import PrintReceipt from "./pages/invoice/print";
import SendSMS from "./pages/send-sms";
import Action from "./pages/invoice/action";
import Recharge from "./pages/recharge";
import UpdateTestList from "./pages/update-testlist";
import Profile from "./pages/profile";
import Referrer from "./pages/referrer";
import AddNew from "./pages/referrer/ReferrerCard";
import ReferrerCard from "./pages/referrer/ReferrerCard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/new" element={<NewInvoice />} />
        <Route path="/invoice/print" element={<PrintReceipt />} />
        <Route path="/invoice/action" element={<Action />} />
        <Route path="/invoice/all" element={<AllInvoices />} />

        <Route path="/referrer" element={<Referrer />} />
        <Route path="/referrer/add-edit" element={<ReferrerCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testlist" element={<TestList />} />
        <Route path="/testlist/update" element={<UpdateTestList />} />

        <Route path="/send-sms" element={<SendSMS />} />
        <Route path="/recharge" element={<Recharge />} />
      </Routes>
    </Layout>
  );
}

export default App;
