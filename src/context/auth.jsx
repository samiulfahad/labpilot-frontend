/** @format */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/lab/login`, credentials, {
        withCredentials: true, // Important for cookies (refreshToken)
      });

      if (response.data.success) {
        const userData = {
          username: response.data.user.username,
          accessControl: response.data.user.accessControl,
          accessToken: response.data.accessToken, // Store accessToken
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: err?.response?.data?.msg || "Login failed" };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/lab/refresh`, {
        withCredentials: true, // Sends stored refreshToken cookie
      });

      if (response.data.success) {
        setUser((prevUser) => ({ ...prevUser, accessToken: response.data.accessToken }));
        return response.data.accessToken;
      }
    } catch (err) {
      console.error("Refresh token failed", err);
      logout();
      return null;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await axios.post(`${API_URL}/api/v1/lab/logout`, { username: user.username }, { withCredentials: true });
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, logout, refreshAccessToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
















// /** @format */

// import React, { useState, useContext, useEffect } from "react";

// const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Initialize user state from local storage
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const login = (userData) => {
//     setUser(userData);
//     // Store user data in local storage
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     // Remove user data from local storage
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
