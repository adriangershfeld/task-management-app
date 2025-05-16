import { vi } from 'vitest';

vi.mock('@auth0/auth0-react', async () => {
  const actual = await import('@auth0/auth0-react');
  let mockIsLoading = false;
  return {
    Auth0Provider: actual.Auth0Provider,
    withAuth0: actual.withAuth0,
    useAuth0: () => ({
      isAuthenticated: false,
      isLoading: mockIsLoading,
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
      user: null,
      __setLoading: (val: boolean) => { mockIsLoading = val; },
    }),
  };
});
