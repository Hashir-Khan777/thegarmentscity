import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/allusers.css";
import { All_Users } from "../store/action/UserAction";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import { Link } from "react-router-dom";

const AllUsers = () => {
  document.querySelector("title").innerHTML = "Users - Garments City";

  const AllUsers = useSelector((state) => state.AllUsers);
  const { loading, allUsers, error } = AllUsers;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(All_Users());
  }, [dispatch]);

  return (
    <div className="all_users">
      <Header />
      <div className="users">
        <div className="all_users_content">
          <h1>Users</h1>
          <ul className="users_list">
            {loading ? (
              <Loadingbox />
            ) : error ? (
              <Messagebox>{error}</Messagebox>
            ) : allUsers && allUsers.length <= 0 ? (
              <p style={{ color: "#620d05", fontSize: 20 }}>
                Tere are no Users
              </p>
            ) : (
              allUsers.map((user, index) => {
                return (
                  <li key={user._id} className="users_item">
                    <p className="users_index">{index + 1 + ")"}</p>
                    <Link to={`/garmentscity/users/${user._id}`}>
                      #{user._id}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllUsers;
