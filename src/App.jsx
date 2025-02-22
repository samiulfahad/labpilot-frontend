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
import Referrer from "./pages/referrer";
import ReferrerCard from "./pages/referrer/ReferrerCard";
import RenderList from "./pages/render-list";
import TestingComponent from "./pages/test/TestingComponent";
import CashMemo from "./pages/cashmemo";
import CommissionTracker from "./pages/commission-tracker";
import InvoicesByReferrer from "./pages/commission-tracker/InvoicesByReferrer";
import Login from "./pages/login";
import StaffManagement from "./pages/staff-management";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/auth";
import LandingPage from "./pages/landing-page";
import StaffForm from "./pages/staff-management/StaffForm";
import AA from "./components/AA";

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
      {/* <Route path="/" element={<AA />} /> */}
        <Route path="/profile" element={<Profile />} />

        {/* Protected Routes Based on Roles */}
        <Route path="/cashMemo" element={<ProtectedRoute element={<CashMemo />} allowedRoles={["getCashmemo"]} />} />
        <Route
          path="/commissionTracker"
          element={<ProtectedRoute element={<CommissionTracker />} allowedRoles={["getCommissionTracker"]} />}
        />
        <Route
          path="/invoice/new"
          element={<ProtectedRoute element={<NewInvoice />} allowedRoles={["postInvoice"]} />}
        />
        <Route
          path="/invoice/print"
          element={<ProtectedRoute element={<PrintReceipt />} allowedRoles={["postInvoice"]} />}
        />
        <Route
          path="/invoice/action"
          element={<ProtectedRoute element={<Action />} allowedRoles={["postInvoice"]} />}
        />
        <Route
          path="/invoice/referrer"
          element={<ProtectedRoute element={<InvoicesByReferrer />} allowedRoles={["postInvoice"]} />}
        />
        <Route
          path="/invoice/all"
          element={<ProtectedRoute element={<AllInvoices />} allowedRoles={["postInvoice"]} />}
        />
        <Route
          path="/referrer"
          element={<ProtectedRoute element={<Referrer />} allowedRoles={["manageReferrers"]} />}
        />
        <Route
          path="/referrer/add"
          element={<ProtectedRoute element={<ReferrerCard />} allowedRoles={["manageReferrers"]} />}
        />
        <Route
          path="/referrer/edit"
          element={<ProtectedRoute element={<ReferrerCard />} allowedRoles={["admin"]} />}
        />
        <Route path="/testlist" element={<ProtectedRoute element={<TestList />} allowedRoles={["admin"]} />} />
        <Route
          path="/testlist/update"
          element={<ProtectedRoute element={<UpdateTestList />} allowedRoles={["admin"]} />}
        />
        <Route path="/render-list" element={<RenderList />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/send-sms" element={<ProtectedRoute element={<SendSMS />} allowedRoles={["postInvoice"]} />} />
        <Route
          path="/staff-management"
          element={<ProtectedRoute element={<StaffManagement />} allowedRoles={["admin"]} />}
        />
        <Route
          path="/staff-management/form"
          element={<ProtectedRoute element={<StaffForm />} allowedRoles={["admin"]} />}
        />
      </Routes>
    </Layout>

    // <Layout>
    //   <Routes>
    //     <Route path="/test-feature" element={<TestingComponent />} />
    //     <Route path="/staff-management" element={<StaffManagement />} />
    //     <Route path="/staff-management/form" element={<StaffForm />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/cashMemo" element={<CashMemo />} />
    //     <Route path="/commissionTracker" element={<CommissionTracker />} />
    //     <Route path="/invoice/new" element={<NewInvoice />} />
    //     <Route path="/invoice/print" element={<PrintReceipt />} />
    //     <Route path="/invoice/action" element={<Action />} />
    //     <Route path="/invoice/referrer" element={<InvoicesByReferrer />} />
    //     <Route path="/invoice/all" element={<AllInvoices />} />
    //     <Route path="/referrer" element={<Referrer />} />
    //     <Route path="/referrer/add" element={<ReferrerCard />} />
    //     <Route path="/referrer/edit" element={<ReferrerCard />} />
    //     <Route path="/profile" element={<Profile />} />
    //     <Route path="/testlist" element={<TestList />} />
    //     <Route path="/testlist/update" element={<UpdateTestList />} />
    //     <Route path="/render-list" element={<RenderList />} />
    //     <Route path="/send-sms" element={<SendSMS />} />
    //     <Route path="/recharge" element={<Recharge />} />
    //   </Routes>
    // </Layout>
  );
}

export default App;
