import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Management App</h1>
        <p>Log in to manage your tasks efficiently</p>
        <button 
          className="login-button" 
          onClick={() => loginWithRedirect()}
        >
          Log In / Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
