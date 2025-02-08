/** @format */

import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = (userData) => {
      setUser(userData); // Set the user data after login
    console.log(userData);
    
  };

  const logout = () => {
    setUser(null); // Reset the user data after logout
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);