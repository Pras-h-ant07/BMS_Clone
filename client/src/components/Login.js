import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../services/user";
import { setUser } from "../redux/userSlice";
import { setFlag } from "../redux/indicatorSlice";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    try {
      const response = await LoginUser(value);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.token);
        dispatch(setUser(response.data));
        dispatch(setFlag(true));
        navigate("/home");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error(error);
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
              Login to
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
                label={<span className="text-white">Email</span>}
                htmlFor="email"
                name="email"
                className="d-block labelCol-white"
                rules={[{ required: true, message: "Email is required !!" }]}
              >
                <Input id="email" type="email" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label={<span className="text-white">Password</span>}
                htmlFor="password"
                name="password"
                className="d-block text-white"
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
                Sign In
              </Button>
            </Form>
            <div>
              <p className="mt-3">
                Not a User?{" "}
                <Link to="/register" className="text-blue-500 underline">
                  Register now
                </Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Login;
