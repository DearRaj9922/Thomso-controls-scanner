import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="nav">
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
