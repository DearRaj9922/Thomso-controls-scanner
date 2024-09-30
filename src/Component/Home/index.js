import { Button } from "antd-mobile";
import React from "react";
import thimg from "../../assets/thomsologo.webp";

import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <div style={{width:"100vw",height:"100vh",overflowX:"hidden",backgroundColor:"gray"}}>
      <Navbar />
      {localStorage.getItem("token") ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              gap: "5%",
              backgroundColor:"gray",
            }}
          >
            <Link to={"/controlscan"}>
              <Button style={{width:"60vw",height:"5vh",fontSize:"25px",display:"flex",justifyContent:"center",alignItems:"center"}} color="primary" fill="solid">
                Controls scan
              </Button>
            </Link>
            <Link to={"/eventsScan"}>
              <Button style={{width:"60vw",height:"5vh",fontSize:"25px",display:"flex",justifyContent:"center",alignItems:"center"}} color="primary" fill="solid">
                Events scan
              </Button>
            </Link>
            <Link to={"/thomsoidinput"}>
              <Button style={{width:"60vw",height:"5vh",fontSize:"25px",display:"flex",justifyContent:"center",alignItems:"center"}} color="primary" fill="solid">
                controls input
              </Button>
            </Link>
            <Link to={"/eventsidinput"}>
              <Button style={{width:"60vw",height:"5vh",fontSize:"25px",display:"flex",justifyContent:"center",alignItems:"center"}} color="primary" fill="solid">
                Events input
              </Button>
            </Link>
          </div>
        </>
      ):(<>
      <div style={{display:"flex",width:"100vw",height:"90vh",justifyContent:"center",alignItems:"center"}} className="imgwrap">
        <img style={{width:"100vw",}} src={thimg} className="thiimage" alt="thimg"/>
        </div>
      </>)}
    </div>
  );
};
export default Home;
