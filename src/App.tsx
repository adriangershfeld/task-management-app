import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import TaskForm from './pages/TaskForm';
import Login from './pages/Login';
import Callback from './pages/Callback';  // Import the Callback component
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/callback" element={<Callback />} />  {/* Add the Callback route */}
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/task/:id" 
                element={
                  <PrivateRoute>
                    <TaskDetail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/task/new" 
                element={
                  <PrivateRoute>
                    <TaskForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/task/edit/:id" 
                element={
                  <PrivateRoute>
                    <TaskForm />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
