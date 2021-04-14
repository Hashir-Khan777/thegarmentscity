import Axios from "axios";

const Search_Data = (page, query) => async (dispatch) => {
  dispatch({ type: "SEARCH_REQUEST", payload: page });
  try {
    const { data } = await Axios.get(
      `https://thegarmentscity.herokuapp.com/api/search?page=${page}&query=${query}`
    );
    dispatch({ type: "SEARCH_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "SEARCH_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export { Search_Data };
