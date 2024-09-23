import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";


axios.defaults.baseURL = "https://api2.thomso.in";
axios.defaults.headers.common.Authorization = `${
  localStorage.getItem("token") === null
    ? ``
    : `Bearer ${localStorage.getItem("token")}`
}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);