import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeaturedComponent from "../components/FeaturedComponent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import { Fetch_Data, Fetch_More_Data } from "../store/action/FetchData";

let page = 1;
const WinterCollection = () => {
  document.querySelector("title").innerHTML =
    "Winter Collection - Garments City";

  const dispatch = useDispatch();

  var winter = [];

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;
  const MoreData = useSelector((state) => state.MoreData);
  const { loadMore, errorMore } = MoreData;

  const load = () => {
    page++;
    dispatch(Fetch_More_Data(page));
  };

  if (products) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].collec === "winter") {
        winter.push(products[i]);
      }
    }
  }

  useEffect(() => {
    dispatch(Fetch_Data(page));
  }, [dispatch]);

  return (
    <div className="summer_collection">
      <Header />
      <div className="summer_featured_products">
        <div className="summer_featured_content">
          {loading ? (
            <Loadingbox />
          ) : error ? (
            <Messagebox>{error}</Messagebox>
          ) : errorMore ? (
            <Messagebox>{errorMore}</Messagebox>
          ) : (
            <div className="summer_products_heading">
              <h1>Winter Collection</h1>
              <div className="summer_products">
                {winter.map((product) => {
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
      <Footer />
    </div>
  );
};

export default WinterCollection;
