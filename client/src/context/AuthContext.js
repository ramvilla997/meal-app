// client/src/context/AuthContext.js

import React, { createContext, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},  // Provide a default function
  user: null,
  setUser: () => {}  // Provide a default function
});
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    setIsAuthenticated(true);
    //setUser(userData);
    const userProfile = await fetchUserProfile(userData._id);
    setUser({ ...userData, profile: userProfile });
  };
  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/user/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
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
