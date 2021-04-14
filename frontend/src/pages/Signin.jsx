import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Login_facebook_signin,
  Sign_In,
  Login_google_signin,
} from "../store/action/UserAction";
import "../css/signin.css";
import Checkout from "../components/Checkout";

const Signin = (props) => {
  document.querySelector("title").innerHTML = "SignIn - Garments City";

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Sign_In(email, password));
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { error, userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="SignIn">
      <Header />
      {props.location.search.split("=")[1] === "shipping" && <Checkout step1 />}
      <div className="sign_in_form">
        <form method="POST" onSubmit={submitHandler}>
          <fieldset>
            <div className="sign_in_content">
              <h1 className="form_heading">Sign In</h1>
              {error ? <p className="error_message_signin">{error}</p> : null}
              <div className="email_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="email">Email Address:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="password_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="password">Password:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <button className="signin_submit_button" type="submit">
                    Sign in
                  </button>
                </div>
              </div>

              <div className="social_auth">
                <div className="or_login">
                  <span>OR</span>
                </div>

                <div className="facebook_google_auth_button">
                  <div className="social_auth_button">
                    <button
                      type="button"
                      className="facebook_button"
                      onClick={() => dispatch(Login_facebook_signin())}
                    >
                      <i className="fab fa-facebook auth_icon"></i>
                      <span>Login with Facebook</span>
                    </button>
                  </div>

                  <div className="social_auth_button">
                    <button
                      type="button"
                      className="google_button"
                      onClick={() => dispatch(Login_google_signin())}
                    >
                      <i className="fab fa-google auth_icon"></i>
                      <span>Login with Google</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="new_customer">
                <p className="new_customer">New to Garments City?</p>
                <Link to={`/register?redirect=${redirect}`}>
                  Create your account
                </Link>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
