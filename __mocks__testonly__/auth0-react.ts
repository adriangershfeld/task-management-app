// src/__mocks__/auth0-react.ts
// Mock for @auth0/auth0-react for local development and CI
export const useAuth0 = () => ({
  isAuthenticated: true,
  isLoading: false,
  user: {
    name: 'Mock User',
    email: 'mockuser@example.com',
    sub: 'auth0|mockuser123',
  },
  loginWithRedirect: async () => {},
  logout: () => {},
});

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => children;
