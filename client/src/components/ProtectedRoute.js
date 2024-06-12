import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../services/user";
import { Link, useNavigate } from "react-router-dom";
import { Menu, message, Layout } from "antd";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { setFlag } from "../redux/indicatorSlice";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  const userDetails = useSelector((state) => state.user.user);
  const flag = useSelector((state) => state.indicator.flag);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      if (response && response.data) {
        dispatch(setUser(response.data));
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!flag) {
      if (localStorage.getItem("token")) {
        getValidUser();
      } else {
        navigate("/");
      }
    }
  }, []);

  const navItems = [
    {
      label: (
        <span
          onClick={() => {
            navigate("/home");
          }}
          className="hover:text-red-500"
        >
          Home
        </span>
      ),
      icon: <HomeOutlined />,
    },
    {
      label: (
        <span className="hover:text-red-500">
          {userDetails ? userDetails.name : " "}
        </span>
      ),
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                userDetails.isAdmin
                  ? navigate("/adminActions")
                  : navigate("/usersActions");
              }}
              className="hover:text-red-500"
            >
              Action Center
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <span className="hover:text-red-500">
              {
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(setFlag(false));
                  }}
                >
                  Logout
                </Link>
              }
            </span>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    <div>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            className="demo-logo nav-logo"
            src="https://bookmyshow-clone-masaischool.netlify.app/bookmyshow-logo.png"
            alt="BookMyShow Logo"
          ></img>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[]}
            items={navItems}
          />
        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </div>
  );
}

export default ProtectedRoute;
