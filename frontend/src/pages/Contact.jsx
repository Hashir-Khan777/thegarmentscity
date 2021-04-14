import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/contact.css";
import { useDispatch, useSelector } from "react-redux";
import { Post_Message } from "../store/action/UserAction";

const Contact = () => {
  document.querySelector("title").innerHTML = "Contact - Garments City";

  const post_reducer = useSelector((state) => state.Post_Reducer);
  const { error, success } = post_reducer;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const post = (e) => {
    e.preventDefault();
    dispatch(Post_Message(name, email, number, message));
    setName("");
    setEmail("");
    setNumber("");
    setMessage("");
  };

  useEffect(() => {
    dispatch({ type: "POST_MESSAGE_RESET" });
  }, [dispatch]);

  return (
    <div className="contact">
      <Header />
      <div className="contact_content">
        <form method="POST" onSubmit={post}>
          <fieldset>
            <legend>
              <h1>Contact Us</h1>
              {error && <span className="post_error">{error}</span>}
              {success && (
                <span className="deliver_paid_success">
                  Message post successfully
                </span>
              )}
            </legend>
            <table>
              <tr>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    value={name}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    value={email}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="number"
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Mobile number"
                    value={number}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <textarea
                    name="message"
                    cols="20"
                    rows="10"
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength="50vw"
                    placeholder="Your message..."
                    value={message}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit" className="post_message">
                    Submit
                  </button>
                </td>
              </tr>
            </table>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
