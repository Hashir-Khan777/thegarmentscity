import Axios from "axios";

const FetchOrders = () => async (dispatch) => {
  dispatch({ type: "ORDER_FETCH_REQUEST" });
  try {
    const { data } = await Axios.get(
      "https://thegarmentscity.herokuapp.com/api/orders"
    );
    dispatch({ type: "ORDER_FETCH_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "ORDER_FETCH_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const CreateOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_CREATE_REQUEST", payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "https://thegarmentscity.herokuapp.com/api/orders",
      order,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data.order });
    dispatch({ type: "CART_EMPTY" });
    localStorage.removeItem("cartItems");
  } catch (err) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const OrderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_DETAILS_REQUEST", payload: orderId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      `https://thegarmentscity.herokuapp.com/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const CancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "CANCEL_ORDER_REQUEST", payload: orderId });
  try {
    const { data } = await Axios.delete(
      `https://thegarmentscity.herokuapp.com/api/orders/${orderId}`
    );
    dispatch({ type: "CANCEL_ORDER_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "CANCEL_ORDER_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Delovered = (orderId) => async (dispatch) => {
  dispatch({ type: "UPDATE_ORDER_REQUEST", payload: orderId });
  try {
    const { data } = Axios.put(
      "https://thegarmentscity.herokuapp.com/api/orders/deliver",
      {
        id: orderId,
      }
    );
    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Paid = (orderId) => async (dispatch) => {
  dispatch({ type: "UPDATE_ORDER_REQUEST", payload: orderId });
  try {
    const { data } = Axios.put(
      "https://thegarmentscity.herokuapp.com/api/orders/paid",
      {
        id: orderId,
      }
    );
    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export { CreateOrder, OrderDetails, CancelOrder, FetchOrders, Delovered, Paid };
