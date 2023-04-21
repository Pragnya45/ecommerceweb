import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";

const  Routes = () =>  {
  return (
    <BrowserRouter>
    <Switch>
      
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <PrivateRoute path="/user/dashboard" element={<UserDashBoard/>} /> 
      <AdminRoute path="/admin/dashboard" element={<AdminDashBoard/>} /> 
      <AdminRoute path="/admin/create/category" element={<AddCategory/>} /> 
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;