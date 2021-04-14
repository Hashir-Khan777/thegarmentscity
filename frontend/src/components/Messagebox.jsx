import React from "react";
import "../css/message.css";

const Messagebox = (props) => {
  return (
    <div className="message">
      <div className="error">
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Messagebox;
