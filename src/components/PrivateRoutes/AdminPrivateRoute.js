import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const adminAuth = useSelector((state) => state.adminAuth);
  if (adminAuth?.data?.name) {
    return children;
  } else {
    return <Navigate to="/admin" />;
  }
};

export default AdminPrivateRoute;
