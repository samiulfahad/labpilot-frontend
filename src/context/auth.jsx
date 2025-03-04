/** @format */

import React, { useState, useContext, useEffect } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from local storage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Remove user data from local storage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
















// /** @format */

// import React, { useState, useContext } from "react";

// const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData); // Set the user data after login
//     console.log(userData);
//   };

//   const logout = () => {
//     setUser(null); // Reset the user data after logout
//   };

//   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
// };
// export const useAuth = () => useContext(AuthContext);
