import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const AdminRoute = ({ component: Component, ...rest }) => {
  const Admin = useSelector((state) => state.Admin);
  const { admin } = Admin;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Redirect to="/signin?redirect=garmentscity/admin" />
        ) : userInfo && admin && admin.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/garmentscity/admin" />
        )
      }
    />
  );
};

export default AdminRoute;
