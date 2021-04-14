import React from "react";
import "../css/checkout.css";

const Checkout = (props) => {
  return (
    <div className="checkout">
      <div className={props.step1 ? "completed" : "notCompleted"}>Sign-In</div>
      <div className={props.step2 ? "completed" : "notCompleted"}>Shipping</div>
      <div className={props.step3 ? "completed" : "notCompleted"}>
        Place Order
      </div>
    </div>
  );
};

export default Checkout;
