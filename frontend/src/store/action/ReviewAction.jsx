import Axios from "axios";

const Post_Review = (reviewId, name, review) => async (dispatch, getState) => {
  dispatch({ type: "REVIEW_POST_REQUEST", payload: reviewId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.post(
      "http://127.0.0.2:5000/api/reviews",
      {
        name,
        review,
      },
      {
        headers: {
          id: reviewId,
          user: userInfo._id,
        },
      }
    );
    dispatch({ type: "REVIEW_POST_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "REVIEW_POST_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Set_Review = () => async (dispatch) => {
  dispatch({ type: "SET_REVIEW_REQUEST" });
  try {
    const { data } = await Axios.get("http://127.0.0.2:5000/api/reviews");
    dispatch({ type: "SET_REVIEW_SUCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "SET_REVIEW_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Delete_Review = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_REVIEW_REQUEST", payload: id });
  try {
    const { data } = await Axios.delete(
      `https://thegarmentscity.herokuapp.com/api/reviews/${id}`
    );
    dispatch({ type: "DELETE_REVIEW_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "DELETE_REVIEW_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export { Post_Review, Set_Review, Delete_Review };
