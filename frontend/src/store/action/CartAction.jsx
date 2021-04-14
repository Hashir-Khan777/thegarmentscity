import Axios from "axios";

const Add_To_Cart = (productId, quantity, size) => async (
  dispatch,
  getState
) => {
  const { data } = await Axios.get(
    `https://thegarmentscity.herokuapp.com/api/products/${productId}`
  );
  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      description: data.description,
      image: data.image,
      price: data.price,
      stock:
        data.sizes &&
        data.sizes.find((x) => x.size === size) &&
        data.sizes.find((x) => x.size === size).stock,
      product: data._id,
      quantity,
      size,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const Remove_From_Cart = (productId) => (dispatch, getState) => {
  dispatch({ type: "CART_REMOVE_ITEM", payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_SHIPPING_ADRRESS", payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export { Add_To_Cart, Remove_From_Cart, saveShippingAddress };
