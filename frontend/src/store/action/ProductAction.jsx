import Axios from "axios";

const DeleteProduct = (id) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DELETE_REQUEST", payload: id });
  try {
    const { data } = await Axios.delete(
      `https://thegarmentscity.herokuapp.com/api/products/${id}`
    );
    dispatch({ type: "PRODUCT_DELETE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const ProductUpdate = (update) => async (dispatch) => {
  dispatch({ type: "PRODUCT_UPDATE_REQUEST", payload: update });
  try {
    const { data } = await Axios.put(
      `https://thegarmentscity.herokuapp.com/api/products/update/${update.id}`,
      update
    );
    dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const ProductCreate = (update) => async (dispatch) => {
  dispatch({ type: "PRODUCT_CREATE_REQUEST", payload: update });
  try {
    const { data } = await Axios.post(
      `https://thegarmentscity.herokuapp.com/api/products/create`,
      update
    );
    dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export { DeleteProduct, ProductUpdate, ProductCreate };
