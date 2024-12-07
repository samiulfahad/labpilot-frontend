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
import ReferrerList from "./pages/referrer/ReferrerList";
import ReferrerCard from "./pages/referrer/ReferrerCard";
import RenderList from "./pages/render-list";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/new" element={<NewInvoice />} />
        <Route path="/invoice/print" element={<PrintReceipt />} />
        <Route path="/invoice/action" element={<Action />} />
        <Route path="/invoice/all" element={<AllInvoices />} />

        <Route path="/referrer/all" element={<ReferrerList />} />
        <Route path="/referrer/add" element={<ReferrerCard />} />
        <Route path="/referrer/edit" element={<ReferrerCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testlist" element={<TestList />} />
        <Route path="/testlist/update" element={<UpdateTestList />} />

        <Route path="/render-list" element={<RenderList />} />

        <Route path="/send-sms" element={<SendSMS />} />
        <Route path="/recharge" element={<Recharge />} />
      </Routes>
    </Layout>
  );
}

export default App;
