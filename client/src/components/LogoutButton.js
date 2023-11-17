// client/src/components/LogoutButton.js

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { isAuthenticated,setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/auth/logout', { headers: { 'Cache-Control': 'no-cache' } });
      console.log(response.data);
      // await axios.get('/auth/logout', { headers: { 'Cache-Control': 'no-cache' } });
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');

      // Navigate to the login page
      navigate('/login', { replace: true });


    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav>
      {isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default LogoutButton;
