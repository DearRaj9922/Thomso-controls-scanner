import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";

import { useNavigate } from "react-router-dom";
import setAuthToken from "../User/setAuthToken";

const Login = () => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    const user = {
      email: values.email,
      password: values.password,
      type: "admin",
    };
    axios
      .post("/api-token-auth/", user)
      .then((res) => {
        if (res.status === 200) {
        const  data = res.data
          localStorage.setItem("token", data.data.access);
          localStorage.setItem("user_id", data.user?.id);
          setAuthToken(data.data.access);
          navigate(`/`);
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
      });
    console.log("Success:", values);
  };

  return (
    <div style={{ padding: "5%",width:"100vw",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",backgroundColor:"gray"}}>
      <div style={{padding:"3%",backgroundColor:"white",borderRadius:"10px"}} className="logwrap">
      <h1 style={{fontSize:"6vw",display:"flex",justifyContent:"center"}}>Thomso'24 Controls Login</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button style={{width:"84.5vw"}} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  );
};


export default Login
