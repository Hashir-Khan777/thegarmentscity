import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/product.css";
import ProductComponent from "../components/ProductComponent";

const Product = (props) => {
  return (
    <div className="product">
      <Header />
      <ProductComponent id={props.match.params.id} prop={props} />
      <Footer />
    </div>
  );
};

export default Product;
