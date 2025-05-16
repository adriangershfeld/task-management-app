import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Callback from './Callback';
import { Auth0Provider } from '@auth0/auth0-react';

describe('Callback Page', () => {
  it('renders loading and handles Auth0 callback', () => {
    render(
      <MemoryRouter>
        <Auth0Provider domain="test" clientId="test" authorizationParams={{ redirect_uri: 'http://localhost:5173/callback' }}>
          <Callback />
        </Auth0Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Completing authentication.../i)).toBeInTheDocument();
  });
});
