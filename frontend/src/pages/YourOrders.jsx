import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import YourOrderContent from "../components/YourOrderContent";

const YourOrders = () => {
  return (
    <div className="your_orders">
      <Header />
      <YourOrderContent />
      <Footer />
    </div>
  );
};

export default YourOrders;
