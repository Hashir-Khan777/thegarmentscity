import Axios from "axios";
import firebase from "firebase/app";

const Sign_In = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_SIGNIN_REQUEST", payload: { email, password } });
  try {
    const {
      data,
    } = await Axios.post(
      "https://thegarmentscity.herokuapp.com/api/users/signin",
      { email, password }
    );
    dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: "USER_SIGNIN_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Login_facebook_signin = () => (dispatch) => {
  dispatch({ type: "USER_SIGNIN_REQUEST" });

  var provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      var user = result.user;
      const { data } = await Axios.post(
        "https://thegarmentscity.herokuapp.com/api/users/signin",
        {
          email: user.email,
          password: "facebook",
        }
      );
      dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((err) => {
      dispatch({
        type: "USER_SIGNIN_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const Login_google_signin = () => (dispatch) => {
  dispatch({ type: "USER_SIGNIN_REQUEST" });

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      var user = result.user;
      const { data } = await Axios.post(
        "https://thegarmentscity.herokuapp.com/api/users/signin",
        {
          email: user.email,
          password: "google",
        }
      );
      dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((err) => {
      dispatch({
        type: "USER_SIGNIN_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const UserRegister = (name, email, password, gender) => async (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
    payload: { name, email, password, gender },
  });
  try {
    const { data } = await Axios.post(
      "https://thegarmentscity.herokuapp.com/api/users/register",
      {
        name,
        email,
        password,
        gender,
      }
    );
    dispatch({ type: "USER_REGISTER_SUCESS", payload: data });
    dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Login_with_facebook = () => (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
  });

  var provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      var user = result.user;
      const { data } = await Axios.post(
        "https://thegarmentscity.herokuapp.com/api/users/register",
        {
          name: user.displayName,
          email: user.email,
          password: "facebook",
          gender: "Male",
          image: user.photoURL,
        }
      );
      dispatch({ type: "USER_REGISTER_SUCESS", payload: data });
      dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((err) => {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const Login_with_Google = () => (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
  });

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      var user = result.user;
      const { data } = await Axios.post(
        "https://thegarmentscity.herokuapp.com/api/users/register",
        {
          name: user.displayName,
          email: user.email,
          password: "google",
          gender: "Male",
          image: user.photoURL,
        }
      );
      dispatch({ type: "USER_REGISTER_SUCESS", payload: data });
      dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((err) => {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const Post_Message = (name, email, number, message) => async (dispatch) => {
  dispatch({
    type: "POST_MESSAGE_REQUEST",
    payload: { name, email, number, message },
  });
  try {
    const { data } = await Axios.post(
      "https://thegarmentscity.herokuapp.com/api/users/posts",
      {
        name,
        email,
        number,
        message,
      }
    );
    dispatch({
      type: "POST_MESSAGE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "POST_MESSAGE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Sign_Out = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("admin");
  dispatch({ type: "USER_SIGN_OUT" });
};

const User_Details = (userId) => async (dispatch, getState) => {
  dispatch({ type: "USER_DETAILS_REQUEST", payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();

  const { data } = await Axios.get(
    `https://thegarmentscity.herokuapp.com/api/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );

  dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  try {
  } catch (err) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const UpdateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: "USER_UPDATE_REQUEST", payload: user });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.put(
      `https://thegarmentscity.herokuapp.com/api/users/profile`,
      user,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
    dispatch({ type: "USER_SIGNIN_SUCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const Admin_Sign_In = (email, password) => async (dispatch) => {
  dispatch({ type: "ADMIN_SIGNIN_REQUEST", payload: { email, password } });
  try {
    const {
      data,
    } = await Axios.post(
      "https://thegarmentscity.herokuapp.com/api/users/admin",
      { email, password }
    );
    dispatch({ type: "ADMIN_SIGNIN_SUCESS", payload: data });
    localStorage.setItem("admin", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: "ADMIN_SIGNIN_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const All_Users = () => async (dispatch) => {
  dispatch({ type: "ALL_USERS_REQUEST" });
  try {
    const { data } = await Axios.get(
      "https://thegarmentscity.herokuapp.com/api/users"
    );
    dispatch({ type: "ALL_USERS_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "ALL_USERS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const All_Messages = () => async (dispatch) => {
  dispatch({ type: "ALL_MESSAGES_REQUEST" });
  try {
    const { data } = await Axios.get(
      "https://thegarmentscity.herokuapp.com/api/users/posts"
    );
    dispatch({ type: "ALL_MESSAGES_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "ALL_MESSAGES_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export {
  Sign_In,
  Sign_Out,
  UserRegister,
  Login_with_facebook,
  Login_with_Google,
  Login_facebook_signin,
  Login_google_signin,
  Post_Message,
  User_Details,
  UpdateUserProfile,
  Admin_Sign_In,
  All_Users,
  All_Messages,
};
