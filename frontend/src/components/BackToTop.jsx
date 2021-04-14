import React from "react";
import "../css/Backtotop.css";

const BackToTop = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) {
      document.querySelector(".top_content").classList.add("top_block");
    } else {
      document.querySelector(".top_content").classList.remove("top_block");
    }
  });

  const Top = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="back_to_top">
      <button className="top_content" onClick={Top}>
        <i className="fas fa-chevron-up go_top"></i>
        <h4 className="go_top_text">Back To Top</h4>
      </button>
    </div>
  );
};

export default BackToTop;
