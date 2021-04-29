import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderDetails, Paid } from "../store/action/OrderAction";
import Loadingbox from "./Loadingbox";
import { Link } from "react-router-dom";
import moment from "moment";
import "../css/OrderScreen.css";
import DatePicker from "react-date-picker";
import { Pay } from "../store/action/PaymentAction";

const OrderScreenContent = (props) => {
  const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer);
  const { order, loading, error } = orderDetailsReducer;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const Payment = useSelector((state) => state.Payment);
  const { PayLoading, PaySuccess, PayError } = Payment;

  const [display, setDisplay] = useState();
  const [cardName, setCardName] = useState();
  const [expDate, setExpDate] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCvv] = useState();
  const [customError, setCustomerror] = useState();

  const orderId = props.id;

  const dispatch = useDispatch();

  const cardInfo = () => {
    setDisplay(false);
    document.querySelector(".billing_form").classList.toggle("none");
  };

  const billingInfo = (e) => {
    e.preventDefault();
    userInfo &&
      dispatch(
        Pay(
          cardNumber,
          cvv,
          expDate,
          order.shippingAddress,
          orderId,
          order.totalPrice,
          userInfo.email
        )
      );
  };

  useEffect(() => {
    dispatch(OrderDetails(orderId));
    if (PaySuccess) {
      dispatch(Paid(orderId));
    }
    setDisplay(true);
  }, [dispatch, orderId, PaySuccess]);

  return (
    <div className="order_screen_content">
      <div className="place_your_order">
        {loading ? (
          <Loadingbox />
        ) : PayLoading ? (
          <Loadingbox />
        ) : (
          <div className="place_order_content">
            <h1>
              Order:- <span>#{order._id}</span>
            </h1>
            <div className="order_deatil_summary">
              <div className="shipping_details">
                <div className="shipping_name_address">
                  <h3>Shipping</h3>
                  <p className="shipping_name">
                    <span>Name:</span> {order.shippingAddress.fullname}
                  </p>
                  <p className="shipping_name">
                    <span>Mobile Number:</span> {order.shippingAddress.number}
                  </p>
                  <p className="shipping_name">
                    <span>Email Address:</span> {userInfo && userInfo.email}
                  </p>
                  <p className="shipping_address">
                    <span>Address:</span> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <p className="deliver_paid_success">
                      Dlivered At:{" "}
                      {order &&
                        moment(order.deliveredAt).format(
                          "MMMM Do YYYY - h:mm:ss"
                        )}
                    </p>
                  ) : (
                    <p className="deliver_paid_fail">Not Delivered</p>
                  )}
                </div>
                <div className="shipping_payment_methode">
                  <h3>Payment</h3>
                  <p className="shipping_address">
                    <span>Method:</span> Credit Card
                  </p>
                  {order.isPaid ? (
                    <p className="deliver_paid_success">
                      Paid At:{" "}
                      {order &&
                        moment(order.paidAt).format("MMMM Do YYYY - h:mm:ss")}
                    </p>
                  ) : (
                    <p className="deliver_paid_fail">Not Paid</p>
                  )}
                </div>
                <div className="shipping_order_items">
                  <h3>Order Items</h3>
                  <ul className="shipping_order_list">
                    {order.orderItems &&
                      order.orderItems.map((item) => {
                        return (
                          <li className="shipping_item" key={item.product}>
                            <div className="shipping_card_iamge">
                              <Link
                                to={`/product/${item.description}/${item.product}`}
                              >
                                <figure>
                                  <img
                                    src={item.image}
                                    alt={item.description}
                                  />
                                </figure>
                                <h3>{item.description}</h3>
                              </Link>
                            </div>
                            <div className="shipping_order_item_price">
                              <p>
                                {item.quantity} x Rs.{item.price} = Rs.
                                {item.quantity * item.price}
                              </p>
                              {item.size !== "wallete" && (
                                <p className="item_size">Size:- {item.size}</p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="order_summary">
                <h2>Order Summary</h2>
                <div className="order_total_setion">
                  <div className="order_total_items">
                    <h3>Item:</h3>
                    <p>Rs.{order.itemsPrice.toFixed(2)}</p>
                  </div>
                  <div className="order_shipping_cahrge">
                    <h3>Shipping:</h3>
                    <p>Rs.{order.shippingPrice.toFixed(2)}</p>
                  </div>
                  <div className="order_shipping_tax">
                    <h3>Tax:</h3>
                    <p>Rs.{order.taxPrice.toFixed(2)}</p>
                  </div>
                  <div className="order_shipping_total">
                    <h2>Order Total:</h2>
                    <p>Rs.{order.totalPrice.toFixed(2)}</p>
                  </div>
                  {PayError && <p className="deliver_paid_fail">{PayError}</p>}
                  <div className="billing_form none">
                    <h2>Billing Info</h2>
                    {customError && (
                      <p className="deliver_paid_fail">{customError}</p>
                    )}
                    <form
                      method="POST"
                      className="billing_form_content"
                      onSubmit={billingInfo}
                    >
                      <input
                        id="token"
                        name="token"
                        type="hidden"
                        value=""
                      ></input>
                      <div className="form_labels">
                        <label htmlFor="card_name">Name On Card:</label>
                      </div>
                      <div className="form_input">
                        <input
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          id="card_name"
                          type="text"
                          className="billing_input"
                          placeholder="Full name"
                          required
                        />
                      </div>

                      <div className="form_labels">
                        <label htmlFor="card_number">Card Number:</label>
                      </div>
                      <div className="form_input">
                        <input
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          id="card_number"
                          type="number"
                          placeholder="Card number"
                          className="billing_input"
                          required
                        />
                      </div>

                      <div className="form_labels">
                        <label htmlFor="exp_date">Expiration Date:</label>
                      </div>
                      <div className="form_input">
                        <DatePicker
                          value={expDate}
                          format="MM-yy"
                          onChange={(e) => setExpDate(e)}
                          className="billing_date"
                          required
                        />
                      </div>

                      <div className="form_labels">
                        <label htmlFor="cvv">CVV:</label>
                      </div>
                      <div className="form_input">
                        <input
                          value={cvv}
                          onChange={(e) => {
                            setCvv(e.target.value);
                            if (e.target.value.length >= 4) {
                              setCustomerror("enter valid CVV");
                            } else {
                              setCustomerror();
                            }
                          }}
                          id="cvv"
                          type="number"
                          className="billing_input"
                          placeholder="CVV"
                          required
                        />
                      </div>

                      <div className="pay_button">
                        <button className="place_order_shipping_button">
                          Pay
                        </button>
                      </div>
                    </form>
                  </div>
                  {order && order.isPaid ? (
                    <button className="place_order_shipping_button">
                      Track Order
                    </button>
                  ) : (
                    display && (
                      <div className="payment_button">
                        <button
                          className="place_order_shipping_button"
                          onClick={cardInfo}
                        >
                          Credit Card
                        </button>
                      </div>
                    )
                  )}
                </div>
                {error && <p className="error_message_order">{error}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreenContent;
