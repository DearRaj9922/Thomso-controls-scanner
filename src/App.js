import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import "antd/dist/antd.css";

import EventsScan from "./Component/AttachQR/EventsScan";
import Login from "./Component/Login";
import PrivateRoute from "./helper/privateRoute";
import ThomsoIDComponent from "./Component/ThomsoId";
import Attachqr from "./Component/AttachQR";
import Profile from "./separate";
import EVENTSIDComponent from "./Component/eventInput";

function App(props) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    if (token) {  
      props?.userDetails && props?.fetchUsers({ id: userId });
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Home} />} />
        <Route
          exact
          path="/thomsoidinput"
          element={
            <PrivateRoute
              component={ThomsoIDComponent}
              history={props?.history}
            />
          }
        />
        <Route
          exact
          path="/eventsidinput"
          element={
            <PrivateRoute
              component={EVENTSIDComponent}
              history={props?.history}
            />
          }
        />
        <Route
          exact
          path="/controlscan"
          element={
            <PrivateRoute component={Attachqr} history={props?.history} />
          }
        />

        <Route
          exact
          path="/eventsscan"
          element={
            <PrivateRoute component={EventsScan} history={props?.history} />
          }
        />
        <Route exact path="/control" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
