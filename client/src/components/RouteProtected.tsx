import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function RouteProtected() {
  const [response] = useContext(UserContext);

  if (response.loading) return <p>Loading...</p>;

  return response.data ? <Outlet /> : <Navigate replace to="/" />;
}
