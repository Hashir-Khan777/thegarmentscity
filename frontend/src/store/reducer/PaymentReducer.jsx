const INITIAL_STATE = {
  data: [],
};

const PaymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return {
        PayLoading: true,
      };

    case "ORDER_PAY_SUCCESS":
      return {
        PayLoading: false,
        PaySuccess: true,
        data: action.payload,
      };

    case "ORDER_PAY_FAIL":
      return {
        PayLoading: false,
        PayError: action.payload,
      };

    default:
      return state;
  }
};

export { PaymentReducer };
