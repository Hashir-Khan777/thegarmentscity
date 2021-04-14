import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/dashboard.css";
import { Delovered, FetchOrders } from "../store/action/OrderAction";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";

const Dashboard = () => {
  document.querySelector("title").innerHTML = "Dashboard - Garments City";

  const dispatch = useDispatch();

  const OrdersFetch = useSelector((state) => state.OrdersFetch);
  const { loadOrders, yourOrders, orderError } = OrdersFetch;

  const UpdateOrder = useSelector((state) => state.UpdateOrder);
  const { loading, success, error } = UpdateOrder;

  const Orderdelivered = (id) => {
    dispatch(Delovered(id));
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_ORDER_RESET" });
    dispatch(FetchOrders());
  }, [dispatch]);

  return (
    <div className="garmentscitydashboard">
      <Header />
      <div className="dashboard">
        {loadOrders ? (
          <Loadingbox />
        ) : loading ? (
          <Loadingbox />
        ) : orderError ? (
          <Messagebox>{orderError}</Messagebox>
        ) : (
          <div className="dashboard_content">
            <div className="dashboard_links">
              <ul className="dashboard_list">
                <li className="dashboard_item">
                  <Link to="/garmentscity/users">Users</Link>
                </li>
                <li className="dashboard_item">
                  <Link to="/garmentscity/products">Products</Link>
                </li>
                <li className="dashboard_item">
                  <Link to="/garmentscity/reviews">Reviews</Link>
                </li>
                <li className="dashboard_item">
                  <Link to="/garmentscity/messages">Messages</Link>
                </li>
                <li className="dashboard_item">
                  <Link to="/garmentscity/products/create">Create Product</Link>
                </li>
              </ul>
            </div>
            <div className="all_orders">
              <div className="user_orders">
                <h2>Orders</h2>
                {error && <span className="error_message_signin">{error}</span>}
                {success && (
                  <span className="deliver_paid_success">
                    Order Update Successfully
                  </span>
                )}
                <ul className="all_orders_list">
                  {yourOrders && yourOrders.length <= 0 ? (
                    <p style={{ color: "#620d05", fontSize: 20 }}>
                      There are no orders
                    </p>
                  ) : (
                    yourOrders.map((order, index) => {
                      return (
                        <li key={order._id} className="users_item">
                          <p className="users_index">{index + 1 + ")"}</p>
                          <p>
                            <Link to={`/order/${order._id}`}>#{order._id}</Link>
                          </p>
                          {order.isDelivered ? null : (
                            <button
                              className="admin_button"
                              onClick={() => Orderdelivered(order._id)}
                            >
                              Delivered
                            </button>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
