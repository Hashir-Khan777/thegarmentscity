import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import { Link } from "react-router-dom";
import { Fetch_Data, Fetch_More_Data } from "../store/action/FetchData";
import { DeleteProduct } from "../store/action/ProductAction";

let page = 1;
const AllProducts = () => {
  document.querySelector("title").innerHTML = "Products - Garments City";

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, count } = productList;

  const DeleteProducts = useSelector((state) => state.DeleteProducts);
  const { loadDelete, deleteSuccess, loadError } = DeleteProducts;
  const MoreData = useSelector((state) => state.MoreData);
  const { loadMore, errorMore } = MoreData;

  const load = () => {
    page++;
    dispatch(Fetch_More_Data(page));
  };

  const dispatch = useDispatch();

  const productDelete = (id) => {
    dispatch(DeleteProduct(id));
  };

  useEffect(() => {
    dispatch(Fetch_Data(page));
    dispatch({ type: "PRODUCT_DELETE_RESET" });
  }, [dispatch]);

  return (
    <div className="all_users">
      <Header />
      <div className="users">
        <div className="all_users_content">
          <h1>Products</h1>
          {loadError && (
            <span className="error_message_signin">{loadError}</span>
          )}
          {deleteSuccess && (
            <span className="deliver_paid_success">
              Product deleted successfully
            </span>
          )}
          <ul className="users_list">
            {loading ? (
              <Loadingbox />
            ) : loadDelete ? (
              <Loadingbox />
            ) : error ? (
              <Messagebox>{error}</Messagebox>
            ) : errorMore ? (
              <Messagebox>{errorMore}</Messagebox>
            ) : products && products.length <= 0 ? (
              <p style={{ color: "#620d05", fontSize: 20 }}>
                There are no products
              </p>
            ) : (
              products.map((product, index) => {
                return (
                  <li key={product._id} className="users_item">
                    <p className="users_index">{index + 1 + ")"}</p>
                    <Link to={`/product/${product.description}/${product._id}`}>
                      #{product._id}
                    </Link>
                    <Link
                      className="product_button"
                      to={`/garmentscity/products/update/${product._id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="product_button"
                      onClick={() => productDelete(product._id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })
            )}
          </ul>
          {products && products.length !== count && (
            <div className="load_more">
              <button className="load_more_button" onClick={load}>
                {loadMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;
