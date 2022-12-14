import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const refreshTokenExp = localStorage.getItem('refreshTokenExp');

  const today = new Date();
  const parsedToday = today.getTime();
  const isExpired = refreshTokenExp - parsedToday < 0;
  // console.log('is refresh token expired?', isExpired);

  if (isExpired) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
