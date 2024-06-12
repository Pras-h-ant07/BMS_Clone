import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../services/user";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const onSubmit = async (value) => {
    try {
      const response = await RegisterUser(value);
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section flex justify-center">
            <h1 className="text-2xl text-white font-bold mt-3 pr-2">
              Register to{" "}
            </h1>
            <img
              className="login-logo mt-1"
              src="https://bookmyshow-clone-masaischool.netlify.app/bookmyshow-logo.png"
              alt="BookMyShow Logo"
            ></img>
          </section>
          <section className="right-section text-white">
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label={<span className="text-white">Name</span>}
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required !!" }]}
              >
                <Input id="name" type="text" placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                label={<span className="text-white">Email</span>}
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required !!" }]}
              >
                <Input id="email" type="email" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label={<span className="text-white">Password</span>}
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required !!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
                className="bg-red-500 text-white"
              >
                Sign Up
              </Button>
            </Form>
            <div>
              <p className="mt-3">
                Already a user?{" "}
                <Link to="/" className="text-blue-500 underline">
                  Login now
                </Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
