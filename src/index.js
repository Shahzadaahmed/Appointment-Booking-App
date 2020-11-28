import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Importing Bootstrap 4...!
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import Routes from './Routes';
import store from "./store/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);