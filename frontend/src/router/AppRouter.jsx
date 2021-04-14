import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "../pages/Error";
import OneUser from "../components/OneUser";
import Account from "../pages/Account";
import AdminSignin from "../pages/AdminSignin";
import AllMessages from "../pages/AllMessages";
import AllProducts from "../pages/AllProducts";
import AllReviews from "../pages/AllReviews";
import AllUsers from "../pages/AllUsers";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import CreateProduct from "../pages/CreateProduct";
import Dashboard from "../pages/Dashboard";
import Edit from "../pages/Edit";
import Filters from "../pages/Filters";
import Home from "../pages/Home";
import MensCollection from "../pages/MensCollection";
import OrderScreen from "../pages/OrderScreen";
import PlaceOrder from "../pages/PlaceOrder";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Shipping from "../pages/Shipping";
import Signin from "../pages/Signin";
import SummerCollection from "../pages/SummerCollection";
import UpdateProduct from "../pages/UpdateProduct";
import WinterCollection from "../pages/WinterCollection";
import WomensCollection from "../pages/WomensCollection";
import YourOrders from "../pages/YourOrders";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route
          exact={true}
          path="/product/:productname/:id"
          component={Product}
        />
        <Route
          exact={true}
          path="/SummerCollection"
          component={SummerCollection}
        />
        <Route
          exact={true}
          path="/WinterCollection"
          component={WinterCollection}
        />
        <Route exact={true} path="/MensFashion" component={MensCollection} />
        <Route
          exact={true}
          path="/WomensFashion"
          component={WomensCollection}
        />
        <Route exact={true} path="/signin" component={Signin} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/cart" component={Cart} />
        <Route exact={true} path="/shipping" component={Shipping} />
        <Route exact={true} path="/placeorder" component={PlaceOrder} />
        <Route exact={true} path="/order/:id" component={OrderScreen} />
        <PrivateRoute
          exact={true}
          path="/account/:username"
          component={Account}
        />
        <Route exact={true} path="/PrivacyPolicy" component={PrivacyPolicy} />
        <Route exact={true} path="/Contact" component={Contact} />
        <PrivateRoute
          exact={true}
          path="/account/:username/orders"
          component={YourOrders}
        />
        <PrivateRoute
          exact={true}
          path="/account/:username/edit"
          component={Edit}
        />
        <Route
          exact={true}
          path="/garmentscity/admin"
          component={AdminSignin}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/dashboard"
          component={Dashboard}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/users"
          component={AllUsers}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/products"
          component={AllProducts}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/reviews"
          component={AllReviews}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/messages"
          component={AllMessages}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/users/:id"
          component={OneUser}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/products/update/:id"
          component={UpdateProduct}
        />
        <AdminRoute
          exact={true}
          path="/garmentscity/products/create"
          component={CreateProduct}
        />
        <Route exact={true} path="/filters" component={Filters} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
