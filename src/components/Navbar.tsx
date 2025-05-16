import { useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Safety timeout to reset state if logout hangs
    const resetTimeout = setTimeout(() => setIsLoggingOut(false), 5000);
    
    // Fallback for Auth0 logout failures
    const fallbackTimeout = setTimeout(() => {
      clearTimeout(resetTimeout);
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
      window.location.reload();
    }, 3000);
    
    try {
      logout();
      clearTimeout(fallbackTimeout);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Task Manager</Link>
      </div>
      {isAuthenticated && (
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Dashboard</Link>
          <Link to="/task/new" className="navbar-item">Create Task</Link>
          <div className="navbar-end">
            <span className="navbar-item user-info">
              {user?.name}
            </span>
            <button 
              className="logout-button" 
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
