import { Col, message } from "antd";
import { Button, NavBar } from "antd-mobile";
import axios from "axios";
import React from "react";
import { QrReader } from "react-qr-reader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Profile from "../../separate1";
const Attachqr = ({ history }) => {
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  let navigate = useNavigate();
  // const { thomsoId } = useParams();
  const [result, setResult] = React.useState(null);

  const handleScan = (data) => {
    if (data) {
      const id = data.split(":")[1];
      setResult(id);
      // navigate("/");
      //   const enrollment_no = getEnrollmentNo(data);
      //   navigate(`/scanresult/${enrollment_no}`);
      //   console.log(data);
    }
  };
  const back = () => {
    history.back();
  };
  const handleError = (err) => {
    console.error(err);
  };
  const checkIn = () => {
    const obj = {
      id: result.thomso_id,
    };
    axios
      .post("https://api2.thomso.in/apiV1/check_in_participant", obj, {
        headers,
      })
      .then((res) => {
        message.success("Checked In Successfully");
        navigate(`/thomsoidinput`);
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
    <div style={{backgroundColor:"gray",width:"100vw",height:"100vh",overflowX:"hidden"}}>
      <Navbar />
      <h1 style={{display:"flex",justifyContent:"center",padding:"10px",fontSize:"40px"}} className="scan">Gates scan</h1>

      <div>
        {result ? (
          <>
            <div>
              <Profile data={result} />
            </div>

          </>
        ) : (
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={async (result, error) => {
              if (!!result) {
                try {
                  console.log(result,"asdasda")
                  console.log(headers,"hsgfugs")
                  const response = await axios.post(
                    `https://api2.thomso.in/apiV1/get_participant_data`,
                    { id: result?.text },
                    { headers }
                  );
                  const u = response.data;
                //   console.log(result?.text);
                //   console.log(u, "uder");
                  setResult(u);
                } catch (error) {
                //   console.log(result,"fsdf")
                  message.error("user not found");
                  console.error("Error:", error);
                }
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

export default Attachqr;
