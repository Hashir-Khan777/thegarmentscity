import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder } from "../store/action/OrderAction";
import Loadingbox from "./Loadingbox";
import Checkout from "../components/Checkout";
import { Link } from "react-router-dom";
import "../css/placeorder.css";
import { Change_Stock } from "../store/action/FetchData";

const PlaceOrderContent = (props) => {
  document.querySelector("title").innerHTML = "Place Order - Garments City";

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice >= 5000 ? toPrice(0) : toPrice(100);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    for (var i = 0; i < cartItems.length; i++) {
      dispatch(
        Change_Stock(
          cartItems[i].product,
          cartItems[i].quantity,
          cartItems[i].stock,
          cartItems[i].size
        )
      );
    }
    dispatch(CreateOrder({ ...cart, orderItems: cartItems }));
  };

  return (
    <div className="place_your_order">
      <Checkout step1 step2 step3 />
      {loading ? (
        <Loadingbox />
      ) : (
        <div className="place_order_content">
          <div className="order_deatil_summary">
            <div className="shipping_details">
              <div className="shipping_name_address">
                <h3>Shipping</h3>
                <p className="shipping_name">
                  <span>Name:</span> {cart.shippingAddress.fullname}
                </p>
                <p>
                  <span>Mobile Number:</span> {cart.shippingAddress.number}
                </p>
                <p className="shipping_address">
                  <span>Address:</span> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </p>
              </div>
              <div className="shipping_payment_methode">
                <h3>Payment</h3>
                <p className="shipping_address">
                  <span>Method:</span> Credit Card
                </p>
              </div>
              <div className="shipping_order_items">
                <h3>Order Items</h3>
                <ul className="shipping_order_list">
                  {cartItems &&
                    cartItems.map((item) => {
                      return (
                        <li className="shipping_item" key={item.product}>
                          <div className="shipping_card_iamge">
                            <figure>
                              <Link
                                to={`/product/${item.description}/${item.product}`}
                              >
                                <img src={item.image} alt={item.description} />
                              </Link>
                            </figure>
                            <h2>
                              <Link
                                className="shipping_title"
                                to={`/product/${item.description}/${item.product}`}
                              >
                                {item.description}
                              </Link>
                            </h2>
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
                  <p>Rs.{cart.itemsPrice.toFixed(2)}</p>
                </div>
                <div className="order_shipping_cahrge">
                  <h3>Shipping:</h3>
                  <p>Rs.{cart.shippingPrice.toFixed(2)}</p>
                </div>
                <div className="order_shipping_tax">
                  <h3>Tax:</h3>
                  <p>Rs.{cart.taxPrice.toFixed(2)}</p>
                </div>
                <div className="order_shipping_total">
                  <h2>Order Total:</h2>
                  <p>Rs.{cart.totalPrice.toFixed(2)}</p>
                </div>
              </div>
              <button
                className="place_order_shipping_button"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>
              {error && <span className="error_message_order">{error}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderContent;
