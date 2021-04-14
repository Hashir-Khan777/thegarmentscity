const INITIAL_STATE = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  messages: [],
  user: [],
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null,
  allUsers: [],
};

const UserSigninReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_SIGNIN_REQUEST":
      return {
        loading: true,
      };

    case "USER_SIGNIN_SUCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };

    case "USER_SIGNIN_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "USER_SIGN_OUT":
      return {};

    default:
      return state;
  }
};

const UserRegister = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };

    case "USER_REGISTER_SUCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };

    case "USER_REGISTER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const Post_Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "POST_MESSAGE_REQUEST":
      return {
        loading: true,
      };

    case "POST_MESSAGE_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "POST_MESSAGE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "POST_MESSAGE_RESET":
      return {};

    default:
      return state;
  }
};

const UserDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return {
        loading: true,
      };

    case "USER_DETAILS_SUCCESS":
      return {
        loading: false,
        user: action.payload,
      };

    case "USER_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const UserUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return {
        loadingUpdate: true,
      };

    case "USER_UPDATE_SUCCESS":
      return {
        loading: false,
        successUpdate: true,
      };

    case "USER_UPDATE_FAIL":
      return {
        loadingUpdate: false,
        errorUpdate: action.payload,
      };

    case "USER_UPDATE_RESET":
      return {};

    default:
      return state;
  }
};

const AdminSigninReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADMIN_SIGNIN_REQUEST":
      return {
        loading: true,
      };

    case "ADMIN_SIGNIN_SUCESS":
      return {
        loading: false,
        admin: action.payload,
      };

    case "ADMIN_SIGNIN_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const AllUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return {
        loading: true,
      };

    case "ALL_USERS_SUCCESS":
      return {
        loading: false,
        allUsers: action.payload.filter((x) =>
          !x.isAdmin ? x !== action.payload : null
        ),
      };

    case "ALL_USERS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const AllMessagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ALL_MESSAGES_REQUEST":
      return {
        loading: true,
      };

    case "ALL_MESSAGES_SUCCESS":
      return {
        loading: false,
        customerMessages: action.payload,
      };

    case "ALL_MESSAGES_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export {
  UserSigninReducer,
  UserRegister,
  Post_Reducer,
  UserDetailsReducer,
  UserUpdateReducer,
  AdminSigninReducer,
  AllUsersReducer,
  AllMessagesReducer,
};
