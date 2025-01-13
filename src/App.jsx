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
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/auth";
import LandingPage from "./pages/landing-page";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location.pathname);

  if (!user && location.pathname === "/") {
    return <LandingPage/>
  } else if (!user && location.pathname !== "/") {
    return <Navigate to="/" replace/>
  }

  return (
    <Layout>
      <Routes>
        <Route path="/test-feature" element={<TestingComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cashMemo" element={<ProtectedRoute element={<CashMemo />} />} />
        <Route path="/commissionTracker" element={<ProtectedRoute element={<CommissionTracker />} />} />
        <Route path="/invoice/new" element={<ProtectedRoute element={<NewInvoice />} />} />
        <Route path="/invoice/print" element={<ProtectedRoute element={<PrintReceipt />} />} />
        <Route path="/invoice/action" element={<ProtectedRoute element={<Action />} />} />
        <Route path="/invoice/referrer" element={<ProtectedRoute element={<InvoicesByReferrer />} />} />
        <Route path="/invoice/all" element={<ProtectedRoute element={<AllInvoices />} />} />
        <Route path="/referrer/all" element={<ProtectedRoute element={<ReferrerList />} />} />
        <Route path="/referrer/add" element={<ProtectedRoute element={<ReferrerCard />} />} />
        <Route path="/referrer/edit" element={<ProtectedRoute element={<ReferrerCard />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/testlist" element={<ProtectedRoute element={<TestList />} />} />
        <Route path="/testlist/update" element={<ProtectedRoute element={<UpdateTestList />} />} />
        <Route path="/render-list" element={<ProtectedRoute element={<RenderList />} />} />
        <Route path="/send-sms" element={<ProtectedRoute element={<SendSMS />} />} />
        <Route path="/recharge" element={<ProtectedRoute element={<Recharge />} />} />
      </Routes>
    </Layout>
  );
}

export default App;