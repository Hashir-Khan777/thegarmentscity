import React from "react";
import { useDispatch } from "react-redux";
import "../css/usersignedin.css";
import { Sign_Out } from "../store/action/UserAction";
import { Link } from "react-router-dom";

const UserSignedin = (props) => {
  const open_panel = () => {
    document.querySelector(".user_panel_list").classList.toggle("block_panel");
    document.querySelector(".down_key").classList.toggle("arrow_rotate");
  };

  window.addEventListener("scroll", () => {
    document.querySelector(".user_panel_list").classList.remove("block_panel");
    document.querySelector(".down_key").classList.remove("arrow_rotate");
  });

  const dispatch = useDispatch();

  const log_out = () => {
    dispatch(Sign_Out());
  };

  return (
    <div className="user_signed_in">
      <ul className="user_signed_in_list">
        <li className="usersigned_in_item">
          <div className="user_signed_in_content" onClick={open_panel}>
            <div className="user_image">
              <figure>
                <img src={props.image} alt={props.name} />
              </figure>
            </div>
            <i className="fas fa-chevron-down down_key"></i>
          </div>
        </li>
        <li className="usersigned_in_item">
          <ul className="user_panel_list">
            <li className="user_panel_item">
              <Link to={`/account/${props.name}`}>
                <i className="far fa-user-circle"></i>
                <p>Your account</p>
              </Link>
            </li>
            <li className="user_panel_item">
              <Link to={`/account/${props.name}/orders`}>
                <i className="fas fa-box"></i>
                <p>Your Orders</p>
              </Link>
            </li>
            <li className="user_panel_item" onClick={log_out}>
              <div className="log_out">
                <i className="fas fa-sign-out-alt"></i>
                <p>Log Out</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default UserSignedin;
