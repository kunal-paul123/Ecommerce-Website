import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

function ProtectedRoute({ children, isAuthenticated, redirectTo }) {
  const { loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
