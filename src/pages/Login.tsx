import { useState, useEffect, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();
  const [isAttemptingLogin, setIsAttemptingLogin] = useState(false);

  // Clear stale Auth0 state
  useEffect(() => {
    if (window.location.pathname === '/login' && !isLoading && !isAuthenticated) {
      localStorage.removeItem('auth0.is.authenticated');
      sessionStorage.clear();
    }
  }, [isAuthenticated, isLoading]);

  const handleLogin = async () => {
    if (isLoading || isAttemptingLogin) return;
    
    try {
      setIsAttemptingLogin(true);
      await loginWithRedirect();
    } catch (err) {
      console.error('Login error:', err);
      setIsAttemptingLogin(false);
    }
  };

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
          onClick={handleLogin}
          disabled={isAttemptingLogin}
        >
          {isAttemptingLogin ? 'Logging in...' : 'Log In / Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Login;
