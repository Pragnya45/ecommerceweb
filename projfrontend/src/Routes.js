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
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";



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
        <Route exact path="/admin/categories" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin/categories"
            element={<ManageCategories />}
          />
        </Route>
          <Route exact path="/admin/create/product" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin/create/product"
            element={<AddProduct />}
          />
        </Route>
        <Route exact path="/admin/products" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin/products"
            element={<ManageProducts/>}
          />
        </Route>
        <Route exact path="/admin/product/update/:productId" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin/product/update/:productId"
            element={<UpdateProduct/>}
          />
        </Route>


      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
