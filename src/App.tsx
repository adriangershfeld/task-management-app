import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import TaskForm from './pages/TaskForm';
import Login from './pages/Login';
import Callback from './pages/Callback';
import './App.css';

const App: FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/callback" element={<Callback />} />
              
              {/* Private routes */}
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
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
