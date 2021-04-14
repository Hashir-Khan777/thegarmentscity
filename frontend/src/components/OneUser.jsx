import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../css/oneuser.css";
import { useDispatch, useSelector } from "react-redux";
import { User_Details } from "../store/action/UserAction";
import Loadingbox from "./Loadingbox";
import Messagebox from "./Messagebox";

const OneUser = (props) => {
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, user, error } = UserDetails;

  user &&
    (document.querySelector(
      "title"
    ).innerHTML = `${user.name} - Garments City`);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(User_Details(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className="one_user">
      <Header />
      <div className="one_user_info">
        <div className="info_one_user">
          {loading ? (
            <Loadingbox />
          ) : error ? (
            <Messagebox>{error}</Messagebox>
          ) : (
            <ul className="show_one_user">
              <li className="one_user_info_item">
                <h3>Id:</h3>
                <p>{user._id}</p>
              </li>
              <li className="one_user_info_item">
                <h3>Name:</h3>
                <p>{user.name}</p>
              </li>
              <li className="one_user_info_item">
                <h3>Email:</h3>
                <p>{user.email}</p>
              </li>
              <li className="one_user_info_item">
                <h3>Gender:</h3>
                <p>{user.gender}</p>
              </li>
              <li className="one_user_info_item">
                <h3>Image:</h3>
                <p>
                  <a href={user.image} target="_image">
                    {user.image}
                  </a>
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OneUser;
