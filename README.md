# Task Management App

A modern, full-featured task management application built with React, TypeScript, and Vite. The app features secure Auth0 authentication, a clean responsive UI, and a robust, industry-standard testing setup using Vitest.

## 🚀 Features

- **Secure Authentication**: Auth0-powered login, registration, and profile management
- **Task Management**: Create, edit, view, and delete tasks with priorities and statuses
- **Modern Tech Stack**: React 18, TypeScript, and Vite for fast, maintainable code
- **Responsive Design**: Optimized for desktop and mobile
- **Testing**: Comprehensive suite using **Vitest** (Jest-compatible API) and React Testing Library
- **Developer Experience**: Hot Module Replacement, fast builds, and TypeScript integration

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (fast, modern, replaces CRA)
- **Authentication**: Auth0 (secure token handling)
- **Testing**: **Vitest** (Jest-compatible, fast) + React Testing Library + Auth0 mocking
- **Routing**: React Router v6
- **State Management**: React Context API + custom hooks
- **Styling**: CSS (responsive, maintainable)

## 📋 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Auth0 account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_REDIRECT_URI=http://localhost:5173/callback
   ```
4. **Configure Auth0**
   - Add `http://localhost:5173/callback` to Allowed Callback URLs
   - Add `http://localhost:5173/login` to Allowed Logout URLs
   - Enable RBAC and add permissions in Access Token

## 🚦 Running the App

### Development
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## 🧪 Testing with Vitest

This project uses **Vitest** for fast, modern, Jest-compatible testing.

### Run all tests
```bash
npm test
```

### Key Testing Features
- **JSDOM Integration**: Simulated DOM for React component tests
- **Auth0 Mocking**: Mocks for Auth0 flows
- **Coverage Reports**: Generate detailed coverage
- **Watch Mode**: `npm test -- --watch`

## 📁 Project Structure

```
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   ├── App.css           # Global styles
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── __mocks__testonly__/  # Testing mocks
├── vite.config.ts        # Vite configuration
└── vitest.config.ts      # Vitest configuration
```

## 🚀 Deployment

- For Vercel/Netlify: Set environment variables in the dashboard and ensure SPA fallback is enabled.
- Update Auth0 Allowed Callback/Logout URLs for your production domain.
- Run `npm run build` and deploy the `build` directory.

---

**Built with React, Vite, and Vitest for modern, secure, and maintainable web apps.**