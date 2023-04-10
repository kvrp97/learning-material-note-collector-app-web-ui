import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}){
  const logged = localStorage.getItem('logged');
  return logged? children : <Navigate to={'/'}/>
}

export default ProtectedRoute;
