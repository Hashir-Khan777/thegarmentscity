import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/header.css";
import UserSignedin from "./UserSignedin";
import { Search_Data } from "../store/action/Searching";

let page = 1;
const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [query, setquery] = useState("");

  const Searching = useSelector((state) => state.Searching);
  const { searches, error } = Searching;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const toggle = () => {
    document.querySelector(".categories_list").classList.add("toggle");
  };

  const toggleClose = () => {
    document.querySelector(".categories_list").classList.remove("toggle");
  };

  if (error) {
    page++;
  }

  useEffect(() => {
    if (query !== "") {
      dispatch(Search_Data(page, query));
    }
  }, [dispatch, query]);

  return (
    <div className="header_nav_bar">
      <header>
        <div className="header_content">
          <div className="header_nav_logo_button">
            <div className="header_button">
              <button className="bars" onClick={toggle}>
                <i className="fas fa-bars bar_toggler"></i>
              </button>
            </div>
            <div className="header_logo">
              <Link to="/">
                <h2 className="logo_text">Garments City</h2>
              </Link>
            </div>
            <div className="categories">
              <ul className="categories_list">
                <i className="fas fa-times close_nav" onClick={toggleClose}></i>
                <li className="categories_item">
                  <Link to="/SummerCollection" className="category_links">
                    Summer wear
                  </Link>
                </li>
                <li className="categories_item">
                  <Link to="/WinterCollection" className="category_links">
                    Winter wear
                  </Link>
                </li>
                <li className="categories_item">
                  <Link to="/MensFashion" className="category_links">
                    Men's fashion
                  </Link>
                </li>
                <li className="categories_item">
                  <Link to="/WomensFashion" className="category_links">
                    Women's fashion
                  </Link>
                </li>
                <li className="categories_item">
                  <Link to="/contact" className="category_links">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="search_box">
            <div className="filtered_products">
              <input
                type="text"
                onChange={(e) => setquery(e.target.value)}
                value={query}
                placeholder="I am looking for..."
                style={userInfo ? { width: "55vw" } : { width: "65vw" }}
                className="search_input"
                onFocus={() => (page = 1)}
              />
              {error && query !== "" ? (
                <ul className="search_list">
                  <li className="search_item">{error}</li>
                </ul>
              ) : searches && searches.length >= 1 && query !== "" ? (
                <ul className="search_list">
                  {searches.map((item) => {
                    return (
                      <Link
                        key={item._id}
                        className="search_link"
                        to={`/product/${item.description}/${item._id}`}
                      >
                        <li key={item._id} className="search_item">
                          {item.description}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              ) : null}
            </div>
            <i className="fas fa-search search_icon"></i>
          </div>

          <div className="header_nav_list">
            <ul className="header_list">
              <li className="header_list_item">
                {userInfo ? (
                  <UserSignedin name={userInfo.name} image={userInfo.image} />
                ) : (
                  <Link className="header_links" to="/signin">
                    Sign In
                  </Link>
                )}
              </li>
              <li className="header_list_item">
                <Link className="header_links" to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
              </li>
              {cartItems.length <= 0 ? null : (
                <Link to="/cart">
                  <p className="in_cart">{cartItems.length}</p>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
