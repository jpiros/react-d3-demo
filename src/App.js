import React, { useState, useEffect, useContext } from "react";
import { Router, navigate } from "@reach/router";
import { AuthContext } from "./auth/authContext";
import Home from "./components/Home";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import D3 from "./components/D3";
import isAuthenticated from "./auth/isAuthenticated";
import { Layout, Menu, Icon } from "antd";
import "./App.css";

export default function App(props) {
  const { Sider } = Layout;
  const { state, dispatch } = useContext(AuthContext);
  const [collapsed, setCollapse] = useState(false);

  useEffect(() => {
    dispatch({
      type: "authenticate",
      payload: isAuthenticated()
    });
  }, [dispatch]);

  const handleClick = e => {
    navigate(e.key);
  };
  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={handleClick}>
            <Menu.Item key="/">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="/d3">
              <Icon type="pie-chart" />
              <span>D3 Charts</span>
            </Menu.Item>

            {!state.loggedIn && (
              <Menu.Item key="/login">
                <Icon type="login" />
                <span>Log In</span>
              </Menu.Item>
            )}
            {state.loggedIn && (
              <Menu.Item key="/logout">
                <Icon type="logout" />
                <span>Log Out</span>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Router>
            <Home path="/" />
            <D3 path="/d3" />
            <Login path="/login" />
            <Logout path="/logout" />
          </Router>
        </Layout>
      </Layout>
    </div>
  );
}
