const CART_INITIAL_STATE = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};

const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case "CART_SAVE_SHIPPING_ADRRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "CART_EMPTY":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export { cartReducer };
