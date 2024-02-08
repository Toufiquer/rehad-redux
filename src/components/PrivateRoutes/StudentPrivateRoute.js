import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StudentPrivateRoute = ({ children }) => {
  const studentAuth = useSelector((state) => state.studentAuth);
  if (studentAuth?.data?.name) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default StudentPrivateRoute;
