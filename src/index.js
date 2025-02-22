import React from "react";
import ReactDOM from "react-dom/client";
import "./normalize.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// if (process.env.RAILS_APP_API_BASE_URL) {
axios.defaults.baseURL = process.env.RAILS_APP_API_BASE_URL =
  "https://nourishd-api-production.up.railway.app/";
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
