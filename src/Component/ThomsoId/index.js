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

const ThomsoIDComponent = ({ history }) => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState(null);
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };


  const back = () => {
    history.back();
  };

  const onSearch = (value) => {
    console.log(value);
    fetchData(value);
  };

  const fetchData = async (value = search) => {
    setLoading(true);
    const tid = "Th-" +value;
    try {
      const response = await axios.post(
        `https://api2.thomso.in/apiV1/get_participant_data`,
        { id: tid },
        { headers }
      );
      const u = response.data;
      // console.log(u);
      console.log(u, "uder");
      setResult(u);
      setLoading(false);
    } catch (error) {
      message.error("user not found");
      console.error("Error:", error);
    }
  };


  return (
    <div>
      <Navbar />
      {result ? (
         <>
          <Profile data={result}/>
         </>
        ) : 
      (<><h1 className="scan">Enter thomso id</h1>
      <div style={{ padding: "10px" }}>
        <Search
          placeholder="Search Thomso ID"
          className="search"
          addonBefore="Th-"
          size="large"
          onSearch={onSearch}
          type="number"
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
    </>)}
    </div>
  );
};

export default ThomsoIDComponent;
