import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const { isAuthenticated, isLoading, error, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      // If the user is authenticated, navigate to the dashboard (or home page).
      if (isAuthenticated) {
        navigate('/');
      } 
      // If there was an error in the redirect process, you might want to display it
      else if (error) {
        console.error(error);
        navigate('/login'); // Redirect to login if error occurs
      }
    }
  }, [isAuthenticated, isLoading, error, navigate]);

  useEffect(() => {
    // Handles the redirect callback from Auth0
    if (window.location.pathname === '/callback') {
      handleRedirectCallback();
    }
  }, [handleRedirectCallback]);

  return <div>Loading...</div>; // Show loading while handling redirect
};

export default Callback;
