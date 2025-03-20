import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';  
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Auth0 configuration
const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';  // Your Auth0 domain
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';   // Your Auth0 client ID
const redirectUri = window.location.origin + "/callback";  // Redirect to /callback after authentication

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}  // Set the correct redirect URI
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
