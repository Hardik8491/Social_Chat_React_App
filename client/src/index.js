import { PersistGate } from "redux-persist/integration/react";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./store/ReduxStore.js";
const container = document.getElementById("root");

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
