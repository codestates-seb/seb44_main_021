import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL =
  "http://ec2-3-37-130-72.ap-northeast-2.compute.amazonaws.com:8080";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
