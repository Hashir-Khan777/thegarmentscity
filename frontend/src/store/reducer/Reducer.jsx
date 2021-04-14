const INITIAL_STATE = {
  products: [],
  product: [],
};

const productListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATA_REQUEST":
      return {
        loading: true,
      };

    case "SET_DATA_SUCESS":
      return {
        loading: false,
        products: action.payload.products,
        count: action.payload.count,
      };

    case "SET_DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const MoreDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MORE_DATA_REQUEST":
      return {
        loadMore: true,
      };

    case "SET_MORE_DATA_SUCCESS":
      return {
        loadMore: false,
      };

    case "SET_MORE_DATA_FAIL":
      return {
        loadMore: false,
        errorMore: action.payload,
      };

    default:
      return state;
  }
};

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCT_DEAILS_REQUEST":
      return {
        loading: true,
      };

    case "PRODUCT_DETAILS_SUCCES":
      return {
        loading: false,
        product: action.payload,
      };

    case "PRODUCT_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer, MoreDataReducer };
