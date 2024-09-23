import { Button } from "antd-mobile";
import React from "react";

import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      {localStorage.getItem("token") && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              gap: "5%",
            }}
          >
            <Link to={"/controlscan"}>
              <Button color="primary" fill="solid">
                Controls scan
              </Button>
            </Link>
            <Link to={"/eventsScan"}>
              <Button color="primary" fill="solid">
                Events scan
              </Button>
            </Link>
            <Link to={"/thomsoidinput"}>
              <Button color="primary" fill="solid">
                controls input
              </Button>
            </Link>
            <Link to={"/eventsidinput"}>
              <Button color="primary" fill="solid">
                Events input
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
