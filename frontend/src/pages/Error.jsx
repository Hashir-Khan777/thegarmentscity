import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/error.css";

const Error = () => {
  document.querySelector("title").innerHTML = "Page not found - Garments City";

  return (
    <div className="error_page">
      <Header />
      <div className="error_content">
        <i className="fas fa-search"></i>
        <h1>Page not found</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
