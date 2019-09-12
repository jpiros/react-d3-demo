import React, { useContext, useEffect } from "react";
import { navigate } from "@reach/router";
import BarChart from "./BarChart";
import HeatMap from "./HeatMap";
import TreeDiagraom from "./TreeDiagram";
import { AuthContext } from "../auth/authContext";
import { Layout, PageHeader } from "antd";

export default function D3(props) {
  const { Content, Header } = Layout;
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/login");
    }
  }, [state]);
  return state.loggedIn ? (
    <>
      <Header style={{ background: "#fff", padding: 0 }}>
        <PageHeader title="Sample D3 Charts" />
      </Header>

      <Content style={{ margin: "0 16px" }}>
        <BarChart />
        <HeatMap />
        <TreeDiagraom />
      </Content>
    </>
  ) : null;
}
