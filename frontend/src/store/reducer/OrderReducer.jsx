const INITIAL_STATE = {
  order: [],
  yourOrders: [],
};

const OrdersFetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ORDER_FETCH_REQUEST":
      return {
        loadOrders: true,
      };

    case "ORDER_FETCH_SUCCESS":
      return {
        loadOrders: false,
        yourOrders: action.payload,
      };

    case "ORDER_FETCH_FAIL":
      return {
        loadOrders: false,
        orderError: action.payload,
      };

    default:
      return state;
  }
};

const orderCreateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return {
        loading: true,
      };

    case "ORDER_CREATE_SUCCESS":
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case "ORDER_CREATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "ORDER_CREATE_RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
};

const orderDetailsReducer = (
  state = { ...INITIAL_STATE, loading: true },
  action
) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return {
        loading: true,
      };

    case "ORDER_DETAILS_SUCCESS":
      return {
        loading: false,
        order: action.payload,
      };

    case "ORDER_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const CancelOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CANCEL_ORDER_REQUEST":
      return {
        loading: true,
      };

    case "CANCEL_ORDER_SUCCESS":
      return {
        loading: false,
        order: action.payload,
      };

    case "CANCEL_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "CANCEL_ORDER_RESET":
      return {};

    default:
      return state;
  }
};

const UpdateOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQUEST":
      return {
        loading: true,
      };

    case "UPDATE_ORDER_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "UPDATE_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "UPDATE_ORDER_RESET":
      return {};

    default:
      return state;
  }
};

export {
  orderCreateReducer,
  orderDetailsReducer,
  CancelOrderReducer,
  OrdersFetchReducer,
  UpdateOrderReducer,
};
