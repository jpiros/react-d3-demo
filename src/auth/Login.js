import React, { useContext, useEffect } from "react";
import { navigate } from "@reach/router";
import Lock from "./Lock";
import { AuthContext } from "./authContext";
import { Layout, PageHeader } from "antd";

export default function Login(props) {
  const { Content, Header } = Layout;
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state.loggedIn) {
      navigate("/d3");
    }
  }, [state]);

  return (
    <>
      <Header style={{ background: "#fff", padding: 0 }}>
        <PageHeader title="Login" />
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Lock location={props.location} />
      </Content>
    </>
  );
}
