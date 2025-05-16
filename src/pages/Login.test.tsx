import { describe, it, expect, beforeEach, vi } from 'vitest';
// --- Static Auth0 mock with mutable state ---
let mockIsLoading = false;
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: mockIsLoading,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    user: null,
  }),
}));

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

describe('Login Page', () => {
  beforeEach(() => {
    mockIsLoading = false;
    // Opt-in to React Router v7 future flags to suppress warnings
    (global as any).REACT_ROUTER_FUTURE = {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    };
  });

  it('renders login button and handles click', async () => {
    mockIsLoading = false;
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByText(/Log In \/ Sign Up/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });

  it('shows loading state', () => {
    mockIsLoading = true;
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
