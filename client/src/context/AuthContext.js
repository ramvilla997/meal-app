// client/src/context/AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},  // Provide a default function
  user: null,
  setUser: () => {}  // Provide a default function
});
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated,user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
