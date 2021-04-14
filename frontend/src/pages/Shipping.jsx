import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { saveShippingAddress } from "../store/action/CartAction";

const Shipping = (props) => {
  document.querySelector("title").innerHTML = "Shipping - Garments City";

  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin?redirect=shipping");
  }
  const [fullname, setFullName] = useState(shippingAddress.fullname);
  const [number, setNumber] = useState(shippingAddress.number);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const redirect = props.location.search
    ? props.location.search.split("?")[2]
    : "/placeorder";

  const dispatch = useDispatch();

  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullname,
        number,
        address,
        city,
        postalCode,
        country,
      })
    );
    props.history.push(redirect);
  };

  return (
    <div className="shipping">
      <Header />
      <Checkout step1 step2 />
      <div className="sign_in_form">
        <form method="POST" onSubmit={shippingSubmitHandler}>
          <fieldset>
            <div className="sign_in_content">
              <h1 className="form_heading">Shipping Address</h1>
              <div className="email_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="fullname">Full Name:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="text"
                      name="name"
                      id="fullname"
                      placeholder="Enter full name"
                      value={fullname}
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="email_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="number">Mobile Number:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="number"
                      name="number"
                      id="number"
                      placeholder="Enter mobile number"
                      value={number}
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="email_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="address">Address:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="password_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="city">City:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="password_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="postal_code">Postal Code:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="number"
                      name="postal code"
                      id="postal_code"
                      placeholder="Enter postal code"
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="password_section">
                <div className="email_password_section">
                  <div>
                    <label htmlFor="country">Country:</label>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="sign_in_input"
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Enter country"
                      value={country}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button className="signin_submit_button" type="submit">
                Continue
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Shipping;
