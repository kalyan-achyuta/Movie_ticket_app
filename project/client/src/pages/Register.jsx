import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { register } from "../calls/authCalls";

function Register() {
  const onSubmit = async(values) => {
    try {
        const userData = await register(values);
        if(userData.success){
            message.success("Registration Successful");
        } else {
            message.error(userData.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="App-header">
        <main
          className="main-area mw-400 text-center px-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <section
            className="left-section"
            
          >
            <h1>Register to BookMyShow</h1>
          </section>
          <section className="right-section" style={{
              width: "100%",
              maxWidth: 320,
              margin: "0 auto",
              padding: "1.25rem",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              borderRadius: 8,
              background: "white",
            }}>
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  rules={[{ required: true, message: "Email is required!" }]}
                ></Input>
              </Form.Item>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                ></Input>
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
