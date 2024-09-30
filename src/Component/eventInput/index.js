import { NavBar } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, message, Spin } from "antd";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button as AButton } from "antd-mobile";
import Navbar from "../Navbar/Navbar";
import Profile from "../../separate";

const { Search } = Input;

const EVENTSIDComponent = ({ history }) => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState(null);
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const back = () => {
    history.back();
  };

  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
  };

  const attactqrcode = (value) => {
    const obj = {
      id: value,
    };
    axios
      .post("https://api2.thomso.in/apiV1/check_in_events", obj, {
        headers,
      })
      .then((res) => {
        if (res.data.status == "true") {
          setSuccess(true);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          message.error(err.response.data.message);
        } else {
          message.error("Something Went Wrong");
        }
      });
  };

  return (
    <div style={{width:"100vw",height:"100vh",backgroundColor:"gray"}}>
      <Navbar />
      {error && (
        <>
          <div
            style={{
              padding: "10px",
              fontSize: "30px",
              color: "red",
              textAlign: "center",
              marginTop: "20vh",
            }}
          >
            <div>
              <i
                class="fa-solid fa-triangle-exclamation"
                style={{ color: "#ff0000", fontSize: "100px" }}
              ></i>
            </div>
            Already Checked In{" "}
          </div>
          <Button
            color="success"
            style={{ width: "100%", margin: "15vh 0" }}
            className="eventButton"
            onClick={() => {
              setResult(null);
              setError(false);
              navigate(`/eventsscan`);
            }}
          >
            Go To Scanner
          </Button>
        </>
      )}
      {success && (
        <>
          <div
            style={{
              padding: "10px",
              fontSize: "30px",
              color: "green",
              textAlign: "center",
              marginTop: "20vh",
            }}
          >
            <div>
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "green", fontSize: "100px" }}
              ></i>
            </div>
            Checked In successfull{" "}
          </div>
          <Button
            color="success"
            style={{ width: "100%", margin: "15vh 0" }}
            className="eventButton"
            onClick={() => {
              setResult(null);
              setError(false);
              setSuccess(false);
              navigate(`/eventsscan`);
            }}
          >
            Go To Scanner
          </Button>
        </>
      )}
      {search ? (
        <>
          <Button
            color="success"
            style={{ width: "100%", margin: "50vh 0" }}
            onClick={() => {
              attactqrcode(search);
            }}
          >
            check In
          </Button>
        </>
      ) : (
        <>
          <h1 style={{display:"flex",justifyContent:"center",fontSize:"40px"}} className="scan">Enter Event Code</h1>
          <div style={{ padding: "10px" }}>
            <Search
              placeholder="Search Events Code"
              className="search"
              size="large"
              onSearch={onSearch}
              type="text"
              enterButton
            />
            {loading && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  width: "100vw",
                  zIndex: 100,
                }}
              >
                <Spin size="large" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EVENTSIDComponent;
