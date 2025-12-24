import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import SalaryCalculation from './pages/SalaryCalculation';
import Reports from './pages/Reports';
import ProfileSettings from './pages/ProfileSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute roles={['company_admin', 'super_admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees"
          element={
            <ProtectedRoute roles={['company_admin']}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="salary"
          element={
            <ProtectedRoute roles={['company_admin']}>
              <SalaryCalculation />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute roles={['company_admin']}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
};

export default App;
