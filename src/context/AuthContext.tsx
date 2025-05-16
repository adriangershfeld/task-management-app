import { createContext, useContext, ReactNode, FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  loginWithRedirect: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect: auth0LoginWithRedirect,
    logout: auth0Logout
  } = useAuth0();

  const loginWithRedirect = async () => {
    try {
      await auth0LoginWithRedirect();
    } catch (err) {
      console.error('Auth0 login error:', err);
      throw err;
    }
  };
  const logout = () => {
    try {
      auth0Logout({
        logoutParams: {
          returnTo: `${window.location.origin}/login`,
          // Use environment variable if provided, otherwise use the origin/login
          ...(import.meta.env.VITE_AUTH0_LOGOUT_URL && {
            returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URL
          })
        }
      });
      
      // Fallback if Auth0 logout redirects to their page but doesn't come back
      setTimeout(() => {
        if (window.location.href.includes('auth0.com/v2/logout')) {
          window.location.href = `${window.location.origin}/login`;
        }
      }, 3000);
    } catch (err) {
      console.error('Logout error:', err);
      window.location.href = `${window.location.origin}/login`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        loginWithRedirect,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
