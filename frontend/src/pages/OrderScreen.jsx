import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderScreenContent from "../components/OrderScreenContent";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;

  document.querySelector(
    "title"
  ).innerHTML = `Order:- #${orderId} - Garments City`;

  return (
    <div className="order_screen">
      <Header />
      <OrderScreenContent id={orderId} />
      <Footer />
    </div>
  );
};

export default OrderScreen;
