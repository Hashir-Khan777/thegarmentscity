const INITIAL_STATE = {
  searches: [],
};

const SearchingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        loading: true,
      };

    case "SEARCH_SUCCESS":
      return {
        loading: false,
        searches: action.payload,
      };

    case "SEARCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { SearchingReducer };
