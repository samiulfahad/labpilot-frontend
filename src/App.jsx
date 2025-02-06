/** @format */

import Layout from "./components/layout/Layout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import Login from "./pages/login";
import UserManagement from "./pages/user-management";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/auth";
import LandingPage from "./pages/landing-page";
import UserForm from "./pages/user-management/UserForm";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  // console.log(1111)
  // console.log(location.pathname);

  if (!user && location.pathname === "/") {
    return <LandingPage/>
  } else if (!user && location.pathname !== "/") {
    return <Navigate to="/" replace/>
  }

  return (
    <Layout>
      <Routes>
        <Route path="/test-feature" element={<TestingComponent />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user-management/user-form" element={<UserForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cashMemo" element={<CashMemo />} />
        <Route path="/commissionTracker" element={<CommissionTracker />} />
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
