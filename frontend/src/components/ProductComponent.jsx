import React, { useEffect, useState } from "react";
import Loadingbox from "./Loadingbox";
import Messagebox from "../components/Messagebox";
import {
  Change_Reviews,
  Product_Details,
  Change_Reviews_Delete,
} from "../store/action/FetchData";
import { useDispatch, useSelector } from "react-redux";
import {
  Delete_Review,
  Post_Review,
  Set_Review,
} from "../store/action/ReviewAction";
import { Add_To_Cart } from "../store/action/CartAction";

const ProductComponent = (props) => {
  const [name, setName] = useState();
  const [review, setReview] = useState();
  const [quantity, setQuantity] = useState();
  const [size, setSize] = useState();

  const dispatch = useDispatch();

  const productId = props.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const PostReview = useSelector((state) => state.PostReview);
  const { posterror, reviewPosted } = PostReview;

  const SetReview = useSelector((state) => state.SetReview);
  const { reviewerror, customerReviews } = SetReview;

  const DeleteReview = useSelector((state) => state.DeleteReview);
  const { deleteerror, reviewsdeleted } = DeleteReview;

  const ChangeReviews = useSelector((state) => state.ChangeReviews);
  const { reviewschanged } = ChangeReviews;

  const add = () => {
    dispatch(Add_To_Cart(productId, quantity ? quantity : 1, size && size));
    props.prop.history.push("/cart");
  };

  if (product) {
    document.querySelector("title").innerHTML =
      product.description + " - Garments City";
  }

  const writtenReviews =
    customerReviews && customerReviews.filter((x) => x.product === productId);

  const post = (id) => {
    dispatch(Post_Review(id, name, review));
    if (name && review) {
      dispatch(Change_Reviews(productId));
      dispatch(Set_Review());
      setName("");
      setReview("");
    }
  };

  const delete_review = (reviewId) => {
    dispatch(Delete_Review(reviewId));
    dispatch(Change_Reviews_Delete(productId));
    dispatch(Set_Review());
  };

  useEffect(() => {
    dispatch(Product_Details(productId));
    dispatch(Set_Review());
  }, [dispatch, productId, reviewschanged]);

  useEffect(() => {
    if (product && product.sizes) {
      setSize(product.sizes[0].size);
    }
  }, [product]);

  useEffect(() => {
    dispatch(Set_Review());
  }, [dispatch, reviewsdeleted, reviewPosted]);

  return (
    <div className="product_component">
      <div className="product_component_content">
        {loading ? (
          <Loadingbox />
        ) : error ? (
          <Messagebox>{error}</Messagebox>
        ) : (
          <div className="product_details">
            <div className="product_card">
              <div className="image_section">
                <figure>
                  <img src={product.image} alt={product.description} />
                </figure>
              </div>

              <div className="details">
                <div className="details_favourite">
                  <h2>{product.description}</h2>
                </div>
                <div className="rating_reviews_details">
                  <div className="ratings_details">
                    <i
                      className={
                        product.ratings >= 1
                          ? "fas fa-star golden"
                          : product.ratings >= 0.5
                          ? "fas fa-star-half-alt golden"
                          : "far fa-star golden"
                      }
                    ></i>
                    <i
                      className={
                        product.ratings >= 2
                          ? "fas fa-star golden"
                          : product.ratings >= 1.5
                          ? "fas fa-star-half-alt golden"
                          : "far fa-star golden"
                      }
                    ></i>
                    <i
                      className={
                        product.ratings >= 3
                          ? "fas fa-star golden"
                          : product.ratings >= 2.5
                          ? "fas fa-star-half-alt golden"
                          : "far fa-star golden"
                      }
                    ></i>
                    <i
                      className={
                        product.ratings >= 4
                          ? "fas fa-star golden"
                          : product.ratings >= 3.5
                          ? "fas fa-star-half-alt golden"
                          : "far fa-star golden"
                      }
                    ></i>
                    <i
                      className={
                        product.ratings >= 5
                          ? "fas fa-star golden"
                          : product.ratings >= 4.5
                          ? "fas fa-star-half-alt golden"
                          : "far fa-star golden"
                      }
                    ></i>
                  </div>

                  <div className="reviews_details">
                    <span>{product.reviews}</span>
                  </div>
                  {product.reviews >= 15 && product.ratings >= 5.0 ? (
                    <span className="best_seeler_product_badge">
                      Best Seller
                    </span>
                  ) : null}
                </div>
                <hr />
                <div className="price_details">
                  <span className="price_head">price:</span>
                  <span className="price_rupees">{product.price}</span>
                </div>
                <div className="size">
                  <h2>
                    {product.sizes &&
                      product.sizes[0].size !== "wallete" &&
                      "Available Sizes"}
                  </h2>
                  {product &&
                  product.sizes &&
                  product.sizes[0].size !== "wallete" ? (
                    <ul className="size_list">
                      {product.sizes.map((prodsize) => {
                        return (
                          <li key={prodsize.size}>
                            <label htmlFor={prodsize.size}>
                              <input
                                type="radio"
                                id={prodsize.size}
                                name="size"
                                value={prodsize.size}
                                onChange={(e) => setSize(e.target.value)}
                                checked={size === prodsize.size}
                              />
                              <span className="checkmark"></span>
                              <span className="label_text">
                                {prodsize.size}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>

                <div className="quantity">
                  <span className="quantity">quantity:</span>
                  <select
                    name="quantity"
                    value={quantity}
                    id="quantity"
                    style={{ cursor: "pointer" }}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option value="0">select...</option>
                    {product && product.sizes
                      ? [
                          ...Array(
                            product.sizes.find(
                              (x) => String(x.size) === size
                            ) &&
                              product.sizes.find((x) => x.size === size).stock
                          ).keys(),
                        ].map((num) => {
                          return (
                            <option value={num + 1} key={num + 1}>
                              {num + 1}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>

              <div className="checkout_buttons">
                <div className="stock">
                  <h2>
                    {product && product.sizes
                      ? product.sizes.find((x) => x.size === size) &&
                        product.sizes.find((x) => x.size === size).stock <= 0
                        ? "Currently Unavailable"
                        : "In Stock"
                      : null}
                  </h2>
                </div>

                {product &&
                product.sizes &&
                product.sizes.find((x) => x.size === size) &&
                product.sizes.find((x) => x.size === size).stock > 0 ? (
                  <div className="button_checkout">
                    <button className="cart_button" onClick={add}>
                      Add To Cart
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?phone=+923103218171&text=Hello! My name is ${
                        userInfo && userInfo.name
                      } and I want to order ${product && product.image} ${
                        product && product.description
                      }, quantity is ${
                        quantity ? quantity : 1
                      } and the size is ${size}`}
                      style={{ color: "#620d05" }}
                      className="cart_button"
                      target="_whatsapp"
                    >
                      Order By <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="review_product">
              {reviewerror ? (
                <p className="post_error">{reviewerror}</p>
              ) : writtenReviews ? (
                writtenReviews.length > 0 && (
                  <div className="reviews">
                    <h1>Customer Reviews</h1>
                    {writtenReviews.map((item) => {
                      return (
                        <div className="writen_reviews" key={item._id}>
                          <div className="name_delete">
                            <h2>{item.name}</h2>
                            {userInfo
                              ? item.user === userInfo._id && (
                                  <i
                                    className="far fa-trash-alt"
                                    onClick={() => delete_review(item._id)}
                                  ></i>
                                )
                              : null}
                          </div>
                          <div className="review_para">
                            <p>{item.review}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : null}

              {userInfo ? (
                <div className="write_review">
                  <h1>Review the Product</h1>
                  {posterror ? (
                    <p className="post_error">{posterror}</p>
                  ) : deleteerror ? (
                    <p className="post_error">{deleteerror}</p>
                  ) : null}
                  <div className="customer_review">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      name="review"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="comment_box"
                      placeholder="Your review..."
                    ></textarea>
                  </div>
                  <button className="post" onClick={() => post(productId)}>
                    Post
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
