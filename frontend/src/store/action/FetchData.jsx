import Axios from "axios";

const Fetch_Data = (page) => async (dispatch) => {
  dispatch({ type: "SET_DATA_REQUEST" });
  try {
    const { data } = await Axios.get(
      `https://thegarmentscity.herokuapp.com/api/products?page=${page}`
    );
    dispatch({
      type: "SET_DATA_SUCESS",
      payload: { products: data[0].item, count: data[0].count },
    });
  } catch (err) {
    dispatch({ type: "SET_DATA_FAIL", payload: err.message });
  }
};

const Fetch_More_Data = (page) => async (dispatch) => {
  dispatch({ type: "SET_MORE_DATA_REQUEST" });
  try {
    const { data } = await Axios.get(
      `https://thegarmentscity.herokuapp.com/api/products?page=${page}`
    );
    dispatch({
      type: "SET_DATA_SUCESS",
      payload: { products: data[0].item, count: data[0].count },
    });
    dispatch({ type: "SET_MORE_DATA_SUCCESS" });
  } catch (err) {
    dispatch({ type: "SET_MORE_DATA_FAIL", payload: err.message });
  }
};

const Product_Details = (productId) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DEAILS_REQUEST", payload: productId });
  try {
    const { data } = await Axios.get(
      `https://thegarmentscity.herokuapp.com/api/products/${productId}`
    );
    dispatch({ type: "PRODUCT_DETAILS_SUCCES", payload: data });
  } catch (err) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Change_Reviews = (id) => async (dispatch, getState) => {
  dispatch({ type: "REVIEWS_CHANGE_REQUEST", payload: id });
  try {
    const {
      productDetails: { product },
    } = getState();

    const { data } = await Axios.patch(
      `https://thegarmentscity.herokuapp.com/api/products/review/${id}`,
      {
        reviews: product.reviews + 1,
        ratings: product.ratings + 0.5,
      }
    );
    dispatch({ type: "REVIEWS_CHANGE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "REVIEWS_CHANGE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Change_Reviews_Delete = (id) => async (dispatch, getState) => {
  dispatch({ type: "REVIEWS_CHANGE_REQUEST", payload: id });
  try {
    const {
      productDetails: { product },
    } = getState();

    const { data } = await Axios.patch(
      `https://thegarmentscity.herokuapp.com/api/products/review/${id}`,
      {
        reviews: product.reviews - 1,
        ratings: product.ratings - 0.5,
      }
    );
    dispatch({ type: "REVIEWS_CHANGE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "REVIEWS_CHANGE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Change_Stock = (id, qty, stk, size) => async (dispatch) => {
  dispatch({
    type: "STOCK_CHANGE_REQUEST",
    payload: { id, qty, stk, size },
  });
  try {
    const { data } = await Axios.patch(
      `https://thegarmentscity.herokuapp.com/api/products/stock/${id}`,
      {
        stock: stk - qty,
        size,
      }
    );
    dispatch({ type: "STOCK_CHANGE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "STOCK_CHANGE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Change_Stock_Add = (id, stk, size, index) => async (dispatch) => {
  dispatch({ type: "STOCK_CHANGE_REQUEST", payload: { id, stk, size, index } });
  try {
    const { data } = await Axios.patch(
      `https://thegarmentscity.herokuapp.com/api/products/stock/${id}`,
      {
        stock: stk,
        size,
        index,
      }
    );
    dispatch({ type: "STOCK_CHANGE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "STOCK_CHANGE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export {
  Fetch_Data,
  Product_Details,
  Change_Reviews,
  Change_Reviews_Delete,
  Change_Stock,
  Change_Stock_Add,
  Fetch_More_Data,
};
