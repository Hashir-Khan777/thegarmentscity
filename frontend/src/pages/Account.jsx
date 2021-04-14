import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import "../css/account.css";
import { Link } from "react-router-dom";

const Account = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  document.querySelector(
    "title"
  ).innerHTML = `${userInfo.name} - Garments City`;

  return (
    <div className="user_account">
      <Header />
      {loading ? (
        <Loadingbox />
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <div className="user_account_panel">
          <div className="user_account_panel_content">
            <div className="account_name_image">
              <div className="profile_image">
                <figure>
                  <img src={userInfo.image} alt={userInfo.name} />
                </figure>
              </div>
              <div className="account_user_info">
                <div className="account_panel_name">
                  <h1>{userInfo.name}</h1>
                  <Link
                    className="edit_link"
                    to={`/account/${userInfo.name}/edit`}
                  >
                    Edit Profile
                  </Link>
                </div>
                <div className="personal_info">
                  <div className="user_personal_info_content">
                    <h2>Personal Info</h2>
                    <div className="user_personal_info">
                      <div className="profile_user_info">
                        <h3>Name:</h3>
                        <p>{userInfo.name}</p>
                      </div>
                      <div className="profile_user_info">
                        <h3>Email Address:</h3>
                        <p>{userInfo.email}</p>
                      </div>
                      <div className="profile_user_info">
                        <h3>Gender:</h3>
                        <p>{userInfo.gender}</p>
                      </div>
                    </div>
                  </div>
                  {shippingAddress.address && (
                    <div className="user_personal_info_content">
                      <h2>Shipping Address</h2>
                      <div className="user_personal_info">
                        <div className="profile_user_info">
                          <h3>Address:</h3>
                          <p>{shippingAddress.address}</p>
                        </div>
                        <div className="profile_user_info">
                          <h3>City:</h3>
                          <p>{shippingAddress.city}</p>
                        </div>
                        <div className="profile_user_info">
                          <h3>Country:</h3>
                          <p>{shippingAddress.country}</p>
                        </div>
                        <div className="profile_user_info">
                          <h3>Mobile Number:</h3>
                          <p>{shippingAddress.number}</p>
                        </div>
                        <div className="profile_user_info">
                          <h3>Postal Code:</h3>
                          <p>{shippingAddress.postalCode}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Account;
