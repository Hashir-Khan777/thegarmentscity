import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/filter.css";
import { useDispatch, useSelector } from "react-redux";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import FeaturedComponent from "../components/FeaturedComponent";
import { Fetch_Data, Fetch_More_Data } from "../store/action/FetchData";

let page = 1;
const Filters = (props) => {
  const brand = props.location.search.split("=")[1];

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;
  const MoreData = useSelector((state) => state.MoreData);
  const { loadMore, errorMore } = MoreData;

  const load = () => {
    page++;
    dispatch(Fetch_More_Data(page));
  };

  const filterdProducts = products && products.filter((x) => x.brand === brand);

  useEffect(() => {
    dispatch(Fetch_Data(page));
  }, [dispatch]);

  return (
    <div className="filters">
      <Header />
      <div className="filter_content">
        <h1>{props.location.search.split("=")[1]}</h1>
        {loading ? (
          <Loadingbox />
        ) : error ? (
          <Messagebox>{error}</Messagebox>
        ) : errorMore ? (
          <Messagebox>{errorMore}</Messagebox>
        ) : (
          <div className="loade_products">
            <div className="filtered_products">
              {filterdProducts.map((product) => {
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
      <Footer />
    </div>
  );
};

export default Filters;
