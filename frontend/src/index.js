import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import GarmentsCity from "./GarmentsCity";
import { Provider } from "react-redux";
import Store from "./store/Store";
import "./css/basic.css";
import "./configuration/FirebaseConfig";
import "./css/mediaquery.css";
import "./FontAwesome/css/all.css";

ReactDOM.render(
  <Provider store={Store}>
    <GarmentsCity />
  </Provider>,
  document.querySelector(".GarmentsCity")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
