import React from "react";
import "../css/featuredcomponent.css";
import { Link } from "react-router-dom";

const FeaturedComponent = (props) => {
  return (
    <div className="featured_item" id={props.id}>
      <div className="featured_card">
        <div className="card_image">
          {props.reviews >= 15 && props.ratings >= 5.0 ? (
            <span className="best_seller_badge">Best Seller</span>
          ) : null}
          <figure>
            <Link to={`/product/${props.description}/${props.id}`}>
              <img src={props.image} alt={props.description} />
            </Link>
          </figure>
        </div>

        <div className="card_details">
          <Link to={`/product/${props.description}/${props.id}`}>
            <h3>{props.description}</h3>
          </Link>
          <div className="card_price">
            <Link to={`/product/${props.description}/${props.id}`}>
              <p>Rs. {props.price}</p>
            </Link>
          </div>
        </div>

        <div className="ratings">
          <div className="ratings_reviews">
            <div className="rating_stars">
              <i
                className={
                  props.ratings >= 1
                    ? "fas fa-star golden"
                    : props.ratings >= 0.5
                    ? "fas fa-star-half-alt golden"
                    : "far fa-star golden"
                }
              ></i>
              <i
                className={
                  props.ratings >= 2
                    ? "fas fa-star golden"
                    : props.ratings >= 1.5
                    ? "fas fa-star-half-alt golden"
                    : "far fa-star golden"
                }
              ></i>
              <i
                className={
                  props.ratings >= 3
                    ? "fas fa-star golden"
                    : props.ratings >= 2.5
                    ? "fas fa-star-half-alt golden"
                    : "far fa-star golden"
                }
              ></i>
              <i
                className={
                  props.ratings >= 4
                    ? "fas fa-star golden"
                    : props.ratings >= 3.5
                    ? "fas fa-star-half-alt golden"
                    : "far fa-star golden"
                }
              ></i>
              <i
                className={
                  props.ratings >= 5
                    ? "fas fa-star golden"
                    : props.ratings >= 4.5
                    ? "fas fa-star-half-alt golden"
                    : "far fa-star golden"
                }
              ></i>
            </div>

            <Link to={`/product/${props.description}/${props.id}`}>
              <span className="reviews">{props.reviews}</span>
            </Link>
          </div>

          <div className="brand">
            <Link
              className="product_brand"
              to={`/filters?brand=${props.brand}`}
            >
              <span>{props.brand}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponent;
