import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Add_To_Cart, Remove_From_Cart } from "../store/action/CartAction";

const CartContent = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  return (
    <div className="cart_content">
      <div className="cart_screen">
        <h1>Shopping Cart</h1>

        {cartItems.length <= 0 ? (
          <div className="empty_cart">
            <h3>
              Your donot have any item in cart <Link to="/">Go shopping</Link>
            </h3>
          </div>
        ) : (
          <div className="cart_products_checkout">
            <div className="products_list_section">
              <ul className="product_list">
                {cartItems.map((item) => {
                  return (
                    <li className="product_item" key={item.product}>
                      <div className="cart_product_image_name">
                        <figure className="cart_product_image">
                          <Link
                            to={`/product/${item.description}/${item.product}`}
                          >
                            <img
                              src={item.image}
                              alt={item.description}
                              title={item.description}
                            />
                          </Link>
                        </figure>
                        <h2>
                          <Link
                            className="cart_product_description"
                            to={`/product/${item.description}/${item.product}`}
                          >
                            {item.description}
                          </Link>
                        </h2>
                      </div>

                      <div className="quantity_price_delete_item">
                        <select
                          name="select"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              Add_To_Cart(
                                item.product,
                                Number(e.target.value),
                                item.size
                              )
                            )
                          }
                          className="select_quantity"
                        >
                          {[...Array(item.stock).keys()].map((key) => {
                            return (
                              <option value={key + 1} key={key + 1}>
                                {key + 1}
                              </option>
                            );
                          })}
                        </select>
                        <p className="product_price">Rs. {item.price}</p>
                        <button
                          className="delete_item"
                          onClick={() =>
                            dispatch(Remove_From_Cart(item.product))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="checkout_section">
              <h3 className="checkout_heading">
                Subtotal (
                {cartItems.reduce((a, c) => Number(a) + Number(c.quantity), 0)}{" "}
                items): Rs.{" "}
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h3>
              <Link to="/signin?redirect=shipping" className="checkout_button">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContent;
