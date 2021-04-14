import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Admin_Sign_In } from "../store/action/UserAction";
import Loadingbox from "../components/Loadingbox";

const AdminSignin = (props) => {
  document.querySelector("title").innerHTML = "Admin - Garments City";

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const Admin = useSelector((state) => state.Admin);
  const { loading, admin, error } = Admin;

  const adminDashboard = (e) => {
    e.preventDefault();
    dispatch(Admin_Sign_In(email, password));
  };

  useEffect(() => {
    if (admin && admin.isAdmin === true) {
      props.history.push("/garmentscity/dashboard");
    }
  }, [props.history, admin]);

  return (
    <div className="SignIn">
      <Header />
      <div className="sign_in_form">
        {loading ? (
          <Loadingbox />
        ) : (
          <form method="POST" onSubmit={adminDashboard}>
            <fieldset>
              <div className="sign_in_content">
                <h1 className="form_heading">Admin</h1>
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
                        value={email}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <button className="signin_submit_button" type="submit">
                      Continue to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminSignin;
