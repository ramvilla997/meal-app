// client/src/App.js

import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogoutButton from './components/LogoutButton';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from './components/Profile';
import LandingPage from './components/LandingPage';
import RecipeSearch from './components/RecipeSearch';
// Import other components

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="app">
        <LogoutButton />
        {/* <LandingPage/> */}
        {/* <RecipeSearch/> */}

        {/* <Routes>
          <Route exact path="/" element={isAuthenticated ? <LogoutButton /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterForm />} />
          <Route path="/profile" element={isAuthenticated ? <ProfileForm /> : <Navigate to="/login" />} />
        </Routes> */}
        <Routes>
          <Route exact path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/profile" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/profile" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/profile" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfileForm /> : <Navigate to="/login" />} />
          <Route path="/recipes" element={isAuthenticated ? <RecipeSearch /> : <Navigate to="/login" />} />

        </Routes>
      </div>
    </Router>
  );
}

const RootComponent = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default RootComponent;
