import React, { useState, useContext, useEffect } from "react";
import api, { refreshAccessToken } from "../services/http";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = async (credentials) => {
    try {
      const response = await api.post(`/v1/lab/login`, credentials, { withCredentials: true });
      if (response.data.success) {
        const user = {
          username: response.data.user.username,
          accessControl: response.data.user.accessControl,
        };
        const accessToken = response.data.accessToken;
        setUser(user);
        setToken(accessToken);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);

        return { success: true };
      } else {
        return { success: false, message: err?.response?.data?.msg || "Login failed" };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: err?.response?.data?.msg || "Login failed" };
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await api.post(`/v1/lab/logout`);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Listen for force logout event from api.js
  useEffect(() => {
    const handleForcedLogout = () => logout();
    window.addEventListener("forceLogout", handleForcedLogout);

    return () => {
      window.removeEventListener("forceLogout", handleForcedLogout);
    };
  }, []);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
