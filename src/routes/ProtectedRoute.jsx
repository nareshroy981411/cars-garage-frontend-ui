// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../features/auth/authSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/register" state={{ from: location }} replace />;
};

export default ProtectedRoute;


// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, useLocation } from 'react-router-dom'
// import { selectIsAuthenticated } from '../features/auth/authSlice'

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useSelector(selectIsAuthenticated)
//   const location = useLocation()

//   if (!isAuthenticated) {
//     return <Navigate to="/register" state={{ from: location }} replace />
//   }

//   return children
// }

// export default ProtectedRoute