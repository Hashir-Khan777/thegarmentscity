import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducer/CartReducer";
import {
  CancelOrderReducer,
  orderCreateReducer,
  orderDetailsReducer,
  OrdersFetchReducer,
  UpdateOrderReducer,
} from "./reducer/OrderReducer";
import { PaymentReducer } from "./reducer/PaymentReducer";
import {
  ProductCreateReducer,
  ProductDeleteReducer,
  ProductUpdateReducer,
} from "./reducer/ProductReducer";
import {
  productListReducer,
  productDetailsReducer,
  MoreDataReducer,
} from "./reducer/Reducer";
import {
  Change_Review_Reducer,
  Delete_Review_Reducer,
  Post_Review_Reducer,
  Set_Review_Reducer,
} from "./reducer/ReviewReducer";
import {
  AdminSigninReducer,
  AllMessagesReducer,
  AllUsersReducer,
  Post_Reducer,
  UserDetailsReducer,
  UserRegister,
  UserSigninReducer,
  UserUpdateReducer,
} from "./reducer/UserReducer";
import { SearchingReducer } from "./reducer/SearchingReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: UserSigninReducer,
  userRegister: UserRegister,
  orderCreate: orderCreateReducer,
  orderDetailsReducer: orderDetailsReducer,
  Post_Reducer: Post_Reducer,
  CancelOrderReducer: CancelOrderReducer,
  PostReview: Post_Review_Reducer,
  SetReview: Set_Review_Reducer,
  DeleteReview: Delete_Review_Reducer,
  OrdersFetch: OrdersFetchReducer,
  UserDetails: UserDetailsReducer,
  UserUpdate: UserUpdateReducer,
  Admin: AdminSigninReducer,
  AllUsers: AllUsersReducer,
  AllMessages: AllMessagesReducer,
  UpdateOrder: UpdateOrderReducer,
  DeleteProducts: ProductDeleteReducer,
  ProductUpdateReducer: ProductUpdateReducer,
  ProductCreateReducer: ProductCreateReducer,
  MoreData: MoreDataReducer,
  Payment: PaymentReducer,
  Searching: SearchingReducer,
  ChangeReviews: Change_Review_Reducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default Store;
