// src/components/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Check if user is logged in AND is an admin
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;