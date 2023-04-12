import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./components/reducers";

// icon bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';
//Route
import { BrowserRouter } from "react-router-dom";
const store = createStore(rootReducer,composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
 
);
