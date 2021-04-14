import React, { useEffect } from "react";
import "../css/yourorder.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CancelOrder, FetchOrders } from "../store/action/OrderAction";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import { Change_Stock_Add } from "../store/action/FetchData";

const YourOrderContent = () => {
  document.querySelector("title").innerHTML = "Your Orders - Garments City";

  const CancelOrderReducer = useSelector((state) => state.CancelOrderReducer);
  const { loading, order, error } = CancelOrderReducer;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const OrdersFetch = useSelector((state) => state.OrdersFetch);
  const { loadOrders, yourOrders, orderError } = OrdersFetch;

  const orders =
    yourOrders && yourOrders.filter((x) => x.user === userInfo._id);

  const dispatch = useDispatch();

  const order_cancel = (id) => {
    var orderId = orders.find((x) => x._id === id);
    dispatch(CancelOrder(id));
    for (var i = 0; i < orderId.orderItems.length; i++) {
      dispatch(
        Change_Stock_Add(
          orderId.orderItems[i].product,
          orderId.orderItems[i].stock,
          orderId.orderItems[i].size
        )
      );
    }
  };

  useEffect(() => {
    dispatch(FetchOrders());
    if (order) {
      dispatch({ type: "CANCEL_ORDER_RESET" });
    }
  }, [dispatch, order]);

  return (
    <div className="your_order_content">
      <h1>Your Orders</h1>
      {error && <p className="post_error">{error}</p>}
      <div className="display_orders">
        {loading || loadOrders ? (
          <Loadingbox />
        ) : orderError ? (
          <Messagebox>{orderError}</Messagebox>
        ) : orders.length > 0 ? (
          <table cellPadding="0">
            <tr>
              <th>Order Id</th>
              <th>Paid</th>
              <th>Deliverd</th>
            </tr>
            {orders.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <h3>
                      <Link to={`/order/${item._id}`}>#{item._id}</Link>
                    </h3>
                  </td>
                  <td className="item_paid">
                    {item.isPaid ? <p>Paid</p> : <p>Not Paid</p>}
                  </td>
                  <td className="item_delivered">
                    {item.isDelivered ? <p>Deliverd</p> : <p>Not Delivered</p>}
                  </td>
                  {item.isPaid || item.isDelivered ? null : (
                    <td>
                      <button
                        className="cancel_order_button"
                        onClick={() => order_cancel(item._id)}
                      >
                        Cancel Order
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </table>
        ) : (
          <div className="no_orders">
            <p>
              You have not made any orders <Link to="/">Go Shopping</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourOrderContent;
