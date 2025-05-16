// Suppress React Router v7 future warnings project-wide for tests
// https://reactrouter.com/en/main/upgrading/v6-to-v7#future-flags
Object.assign(globalThis, {
  REACT_ROUTER_FUTURE: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});
