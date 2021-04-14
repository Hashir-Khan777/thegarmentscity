import React from "react";
import CartContent from "../components/CartContent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/cart.css";

const Cart = () => {
  document.querySelector("title").innerHTML = "Shopping Cart - Garments City";

  return (
    <div className="Cart">
      <Header />
      <CartContent />
      <Footer />
    </div>
  );
};

export default Cart;
