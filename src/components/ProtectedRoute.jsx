/** @format */

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import LandingPage from "../pages/landing-page";

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();
    const location = useLocation()

  // If user is not logged in, redirect to the login page
  if (!user) {
    return <LandingPage/>
  }

  // Otherwise, render the passed component
  return element;
};

export default ProtectedRoute;
