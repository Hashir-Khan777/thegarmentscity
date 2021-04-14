import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/allmessages.css";
import { All_Messages } from "../store/action/UserAction";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";

const AllMessages = () => {
  const dispatch = useDispatch();

  const AllMessages = useSelector((state) => state.AllMessages);
  const { loading, customerMessages, error } = AllMessages;

  useEffect(() => {
    dispatch(All_Messages());
  }, [dispatch]);

  return (
    <div className="messages">
      <Header />
      <div className="all_messages">
        <div className="message_content">
          <h1>Messages</h1>
          {loading ? (
            <Loadingbox />
          ) : error ? (
            <Messagebox>{error}</Messagebox>
          ) : customerMessages && customerMessages.length <= 0 ? (
            <p style={{ color: "#620d05", fontSize: 20 }}>
              There are no messages
            </p>
          ) : (
            <table>
              <tr>
                <td></td>
                <td>
                  <h3>Email Address</h3>
                </td>
                <td>
                  <h3>Message</h3>
                </td>
              </tr>
              {customerMessages &&
                customerMessages.map((message, index) => {
                  return (
                    <tr key={message._id}>
                      <td>{index + 1 + ")"}</td>
                      <td>{message.email}</td>
                      <td>{message.message}</td>
                    </tr>
                  );
                })}
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllMessages;
