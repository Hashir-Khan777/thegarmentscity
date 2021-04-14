import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Login_with_facebook,
  Login_with_Google,
  UserRegister,
} from "../store/action/UserAction";
import Checkout from "../components/Checkout";

const Register = (props) => {
  document.querySelector("title").innerHTML = "Register - Garments City";

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [gender, setGender] = useState();
  const [passwordError, setPasswordError] = useState();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Password doesnot match");
    } else {
      if (gender === "0") {
        setPasswordError("gender is required");
      } else {
        dispatch(UserRegister(name, email, password, gender));
      }
    }
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="register">
      <Header />
      {props.location.search.split("=")[1] === "shipping" && <Checkout step1 />}
      <div className="sign_in_form">
        <form method="POST" onSubmit={submitHandler}>
          <fieldset>
            <div className="sign_in_content">
              <h1 className="form_heading">Create Account</h1>
              {error ? (
                <p className="error_message_signin">{error}</p>
              ) : passwordError ? (
                <p className="error_message_signin">{passwordError}</p>
              ) : null}
              <div className="email_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="name">Name:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

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

              <div className="email_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="gender">Gender:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <select
                      className="sign_in_input"
                      style={{ cursor: "pointer" }}
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      id="gender"
                    >
                      <option value="0">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="other">Other</option>
                    </select>
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

              <div className="password_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="password"
                      name="confirm password"
                      id="confirmpassword"
                      placeholder="Enter confirm password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <button className="signin_submit_button" type="submit">
                    Register
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
                      onClick={() => dispatch(Login_with_facebook())}
                    >
                      <i className="fab fa-facebook auth_icon"></i>
                      <span>Login with Facebook</span>
                    </button>
                  </div>

                  <div className="social_auth_button">
                    <button
                      type="button"
                      className="google_button"
                      onClick={() => dispatch(Login_with_Google())}
                    >
                      <i className="fab fa-google auth_icon"></i>
                      <span>Login with Google</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="new_customer">
                <p className="new_customer">Already have an account?</p>
                <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
