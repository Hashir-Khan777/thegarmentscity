import React from "react";
import "../css/loading.css";

const Loadingbox = () => {
  return (
    <div className="loading">
      <i className="fas fa-spinner fa-spin spinner"></i>
      <p>Loading...</p>
    </div>
  );
};

export default Loadingbox;
