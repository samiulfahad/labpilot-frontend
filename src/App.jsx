/** @format */

import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
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
import TestingComponent from "./pages/test/TestingComponent";
import CashMemo from "./pages/cashmemo";
import CommissionTracker from "./pages/commission-tracker";
import InvoicesByReferrer from "./pages/commission-tracker/InvoicesByReferrer";
import UploadReport from "./pages/upload-report";
import UploadCBC from "./pages/upload-report/cbc";
import UploadRBS from "./pages/upload-report/rbs";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/test-feature" element={<TestingComponent />} />
        <Route path="/upload-report" element={<UploadReport />} />
        <Route path="/upload-report/cbc01" element={<UploadCBC />} />
        <Route path="/upload-report/rbs01" element={<UploadRBS />} />
        <Route path="/cashMemo" element={<CashMemo />} /> // Cashmemo and Commission Tracker
        <Route path="/commissionTracker" element={<CommissionTracker />} /> // Cashmemo and Commission Tracker
        <Route path="/invoice/new" element={<NewInvoice />} />
        <Route path="/invoice/print" element={<PrintReceipt />} />
        <Route path="/invoice/action" element={<Action />} />
        <Route path="/invoice/referrer" element={<InvoicesByReferrer />} />
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
