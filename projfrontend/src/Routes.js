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

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route exact path="/user/dashboard" element={<PrivateRoute />}>
          <Route exact path="/user/dashboard" element={<UserDashBoard />} />
        </Route>
        <Route exact path="/admin/dashboard" element={<PrivateRoute />}>
          <Route exact path="/admin/dashboard" element={<AdminDashBoard />} />
        </Route>

        <Route exact path="/admin/create/category" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin/create/category"
            element={<AddCategory />}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
