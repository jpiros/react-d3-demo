import React from "react";
import { Layout, PageHeader } from "antd";

export default function Home() {
  const { Content, Header } = Layout;

  return (
    <d>
      <Header style={{ background: "#fff", padding: 0 }}>
        <PageHeader title="Home" />
      </Header>
      <Content style={{ margin: "0 16px" }} />
    </d>
  );
}
