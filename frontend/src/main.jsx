import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./components/Auth/Auth";
import '@mantine/core/styles.css';
import "./index.css";
import { Suspense, lazy } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth>
      <App />
  </Auth>
);
