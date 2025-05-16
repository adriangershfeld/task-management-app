// src/__mocks__/auth0.ts
export function getAuth0Mock({ isLoading = false } = {}) {
  return {
    useAuth0: () => ({
      isAuthenticated: false,
      isLoading,
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
      user: null,
    }),
  };
}
