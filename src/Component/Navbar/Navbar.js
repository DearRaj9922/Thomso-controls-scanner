import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="nav" style={{width:"100vw",height:"10vh",display:"flex",padding:"10px 30px",alignItems:"center",justifyContent:"space-between",fontSize:"4vw",backgroundColor:"black",color:"white"}}>
      <span
        className="home-button"
        onClick={() => {
          navigate("/");
        }}
      >
        HOME
      </span>
      {localStorage.getItem("token") ? (
        <>
          <button
            className="Login"
            style={{backgroundColor:"blue",borderRadius:"4px"}}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload(false);
            }}
          >
            LOGOUT
          </button>
        </>
      ) : (
        <>
          <button
            className="Login"
            style={{backgroundColor:"blue",borderRadius:"4px"}}
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </button>
        </>
      )}
    </div>
  );
}

export default Navbar;
