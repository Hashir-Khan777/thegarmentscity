const INITIAL_STATE = {};

const ProductDeleteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return {
        loadDelete: true,
      };

    case "PRODUCT_DELETE_SUCCESS":
      return {
        loadDelete: false,
        deleteSuccess: true,
      };

    case "PRODUCT_DELETE_FAIL":
      return {
        loadDelete: false,
        loadError: action.payload,
      };

    case "PRODUCT_DELETE_RESET":
      return {};

    default:
      return state;
  }
};

const ProductUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCT_UPDATE_REQUEST":
      return {
        loadupdate: true,
      };

    case "PRODUCT_UPDATE_SUCCESS":
      return {
        loadupdate: false,
        updateSuccess: true,
      };

    case "PRODUCT_UPDATE_FAIL":
      return {
        loadupdate: false,
        updateError: action.payload,
      };

    case "PRODUCT_UPDATE_RESET":
      return {};

    default:
      return state;
  }
};

const ProductCreateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return {
        loading: true,
      };

    case "PRODUCT_CREATE_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "PRODUCT_CREATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "PRODUCT_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

export { ProductDeleteReducer, ProductUpdateReducer, ProductCreateReducer };
