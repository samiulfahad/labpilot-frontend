/** @format */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  // If the user is an admin, grant access to everything
  if (user.roles.includes("admin")) {
    return element;
  }

  // Check if user has at least one of the required roles
  const hasAccess = allowedRoles.some((role) => user.roles.includes(role));

  return hasAccess ? (
    element
  ) : (
    <div className="flex justify-center items-center w-full h-screen text-2xl text-red-500">Sorry, you don't have access to this page</div>
  );
};

export default ProtectedRoute;
