import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/allreviews.css";
import { useDispatch, useSelector } from "react-redux";
import { Set_Review } from "../store/action/ReviewAction";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import { Link } from "react-router-dom";

const AllReviews = () => {
  document.querySelector("title").innerHTML = "Reviews - Garments City";

  const dispatch = useDispatch();

  const SetReview = useSelector((state) => state.SetReview);
  const { loading, customerReviews, reviewerror } = SetReview;

  useEffect(() => {
    dispatch(Set_Review());
  }, [dispatch]);

  return (
    <div className="all_reviews">
      <Header />
      <div className="user_reviews">
        <div className="review_content">
          <h1>Reviews</h1>
          {loading ? (
            <Loadingbox />
          ) : reviewerror ? (
            <Messagebox>{reviewerror}</Messagebox>
          ) : customerReviews && customerReviews.length <= 0 ? (
            <p style={{ color: "#620d05", fontSize: 20 }}>
              There are not reviews
            </p>
          ) : (
            <table>
              <tr>
                <td></td>
                <td>
                  <h3>Product Id</h3>
                </td>
                <td>
                  <h3>User Id</h3>
                </td>
                <td>
                  <h3>Review</h3>
                </td>
              </tr>
              {customerReviews.map((review, index) => {
                return (
                  <tr key={review._id}>
                    <td>{index + 1 + ")"}</td>
                    <td>
                      <Link to={`/product/${review.review}/${review.product}`}>
                        #{review.product}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/garmentscity/users/${review.user}`}>
                        #{review.user}
                      </Link>
                    </td>
                    <td>{review.review}</td>
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

export default AllReviews;
