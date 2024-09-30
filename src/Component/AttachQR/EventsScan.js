import { message } from "antd";
import { Button } from "antd-mobile";
import axios from "axios";
import React from "react";
import { QrReader } from "react-qr-reader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const EventsScan = ({ history }) => {
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  let navigate = useNavigate();
  // const { thomsoId } = useParams();
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const back = () => {
    history.back();
  };
  const handleError = (err) => {
    console.error(err);
  };
  const attactqrcode = () => {
    const obj = {
      id: result,
    };
    axios
      .post("https://api2.thomso.in/apiV1/check_in_events", obj, {
        headers,
      })
      .then((res) => {
        if (res.data.status == "true") {
          setSuccess(true);
          navigate(`/eventsscan`);
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
      <Navbar back="Back" onBack={back}>
        <b>EventsScan</b>
      </Navbar>
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
            }}
          >
            Go To Scanner
          </Button>
        </>
      )}
      <div style={{ padding: "10px" }}>
        {result ? (
          <>
            <Button
              color="success"
              style={{ width: "100%", margin: "50vh 0" }}
              onClick={attactqrcode}
            >
              check In
            </Button>
          </>
        ) : (
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={async (result, error) => {
              if (!!result) {
                setResult(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default EventsScan;
