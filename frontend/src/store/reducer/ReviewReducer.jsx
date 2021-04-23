const INITIAL_STATE = {
  reviews: [],
  customerReviews: [],
};

const Post_Review_Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REVIEW_POST_REQUEST":
      return {
        loading: true,
      };

    case "REVIEW_POST_SUCCESS":
      return {
        loading: false,
        reviews: action.payload,
        reviewPosted: true,
      };

    case "REVIEW_POST_FAIL":
      return {
        loading: false,
        posterror: action.payload,
      };

    default:
      return state;
  }
};

const Set_Review_Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_REVIEW_REQUEST":
      return {
        loading: true,
      };

    case "SET_REVIEW_SUCESS":
      return {
        loading: false,
        customerReviews: action.payload,
      };

    case "SET_REVIEW_FAIL":
      return {
        loading: false,
        reviewerror: action.payload,
      };

    default:
      return state;
  }
};

const Delete_Review_Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DELETE_REVIEW_REQUEST":
      return {
        loading: true,
      };

    case "DELETE_REVIEW_SUCCESS":
      return {
        loading: false,
        reviewsdeleted: true,
      };

    case "DELETE_REVIEW_FAIL":
      return {
        loading: false,
        deleteerror: action.payload,
      };

    default:
      return state;
  }
};

const Change_Review_Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REVIEWS_CHANGE_REQUEST":
      return {
        loading: true,
      };

    case "REVIEWS_CHANGE_SUCCESS":
      return {
        loading: false,
        reviewschanged: true,
      };

    case "REVIEWS_CHANGE_FAIL":
      return {
        loading: false,
        reviewchangeerror: action.payload,
      };

    default:
      return state;
  }
};

export {
  Post_Review_Reducer,
  Set_Review_Reducer,
  Delete_Review_Reducer,
  Change_Review_Reducer,
};
