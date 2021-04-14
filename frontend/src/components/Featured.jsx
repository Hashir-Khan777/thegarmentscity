import React, { useEffect } from "react";
import FeaturedComponent from "./FeaturedComponent";
import "../css/featured.css";
import Loadingbox from "./Loadingbox";
import Messagebox from "./Messagebox";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Data, Fetch_More_Data } from "../store/action/FetchData";

let page = 1;
const Featured = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;
  const MoreData = useSelector((state) => state.MoreData);
  const { loadMore, errorMore } = MoreData;

  const load = () => {
    page++;
    dispatch(Fetch_More_Data(page));
  };

  useEffect(() => {
    dispatch(Fetch_Data(page));
  }, [dispatch]);

  return (
    <div className="featured_cloths">
      <div className="featured_content">
        {loading ? (
          <Loadingbox />
        ) : error ? (
          <Messagebox>{error}</Messagebox>
        ) : errorMore ? (
          <Messagebox>{errorMore}</Messagebox>
        ) : (
          <div className="products_heading">
            <h1>Featured Cloths</h1>
            <div className="products">
              {products.map((product) => {
                return (
                  <FeaturedComponent
                    ratings={product.ratings}
                    id={product._id}
                    key={product._id}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                    reviews={product.reviews}
                    brand={product.brand}
                  />
                );
              })}
            </div>
            {products && products.length !== count && (
              <div className="load_more">
                <button className="load_more_button" onClick={load}>
                  {loadMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
