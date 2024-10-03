import React, { useEffect } from "react";
import "./index.css";
import profileImg from "../assets/propic.svg";
import { message } from "antd";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ data }) => {
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  let navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);
  const checkIn = () => {
    const obj = {
      id: data.thomso_id,
    };
    axios
      .post("https://api2.thomso.in/apiV1/check_in_participant", obj, {
        headers,
      })
      .then((res) => {
        message.success("Checked In Successfully");
        navigate(`/`);
      })
      .catch((err) => {
        if (err.response?.data?.Message) {
          console.log(err.response.data);
          message.error(err.response.data.Message);
        } else {
          message.error(err.response.data.Message);
        }
      });
  };


  return (
    <div className="containerNew" style={{ paddingBottom: "20px" }}>
      {data ? (
        <>
          <span style={{ fontSize: "20px", color: "white" }}>
            payment :{" "}
            {data?.payment ? (
              <>
                <span style={{ color: "green" }}> payment sucess</span>
              </>
            ) : (
              <>
                <span style={{ color: "red" }}>payment unsucess</span>
              </>
            )}
          </span>
          <img src={data.avtar} alt="profile" className="profileImg" />
          <hr />
          <h2 style={{ color: "white",fontSize:"23px" }}>
            Name : {data?.name} {data?.is_ca ? <>(CA)</> : <></>}
            <br />
            Thomso ID : {data?.thomso_id}
            <br />
            Accommodation : {data?.accommodation ? <>true</> : <>false</>}
          </h2>
          <div className="details">
            <div className="collegeDetails">
              <h3 className="heading">College Details</h3>
              <div>College Name : {data?.college}</div>
              <div>State : {data?.state}</div>
              <div>City : {data?.city}</div>
              <div>Year : {data?.year}</div>
            </div>
            <div className="personalDetails">
              <h3 className="heading">Personal Details</h3>
              <div>Email : {data?.email}</div>
              <div>contact : {data?.contact}</div>
              <div>Gender : {data?.gender}</div>
            </div>
            {!data?.is_ca && (
              <div className="personalDetails">
                <h3 className="heading">CA Details</h3>
                <div>Name : {data?.ca_name}</div>
                <div>contact : {data?.ca_contact}</div>
                <div>CA Thomso ID : {data?.ca_thomso_id}</div>
              </div>
            )}
          </div>
          {data?.gatecheckin?(
            <p
            className="btn"
            style={{
              
              width: "auto",
              padding: "5px 10px 5px 10px",
              color: "white",
              height: "auto",
            }}
            > Already Checked in from Gate</p>
          ):( 
            <p
            className="btn"
            style={{
              
              width: "auto",
              padding: "5px 10px 5px 10px",
              color: "white",
              height: "auto",
            }}
            > Not Checked in from Gate</p>
         
        )}
          {data?.checkinbp ? (
            <p
              className="btn"
              style={{
                width: "auto",
                padding: "5px 10px 5px 10px",
                color: "white",
                height: "auto",
              }}
            >
              Already Checked In
            </p>
          ) : (
            <button
              className="btn"
              style={{ width: "200px", marginTop: "20px", fontSize: "25px" }}
              onClick={checkIn}
            >
              Check In
            </button>
          )}
        </>
      ) : (
        <>
          <span style={{ color: "white", fontSize: "10vw" }}>Loading...</span>
        </>
      )}
    </div>
  );
};

export default Profile;
