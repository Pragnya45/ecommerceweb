import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = (props) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
