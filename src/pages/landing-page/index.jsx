/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const LandingPage = () => {
    const {login} = useAuth()
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Our Application {React.version}</h1>
      <p>Please log in to access the features.</p>
      <button onClick={() => login({username: 665, roles:['admin']})} style={{ marginTop: "20px" }}>
        Go to Login
      </button>
    </div>
  );
};

export default LandingPage;
