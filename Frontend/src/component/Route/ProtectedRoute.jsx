import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

function ProtectedRoute({ redirectTo }) {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />}
      {/* {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )} */}
    </>
  );
}

export default ProtectedRoute;
