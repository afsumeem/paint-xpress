import React, { useState } from "react";
import {
  HistoryOutlined,
  BookOutlined,
  EditOutlined,
  UserOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/userprofile">User Profile</Link>, "", <UserOutlined />),
  getItem(
    <Link href="/bookinghistory">Booking History</Link>,
    "2",
    <HistoryOutlined />
  ),
  getItem(
    <Link href="/bookingstatus">Booking Status</Link>,
    "5",
    <BookOutlined />
  ),
  getItem("Quick Actions", "7", <InteractionOutlined />, [
    getItem(<Link href="/#feedback">Feedback us</Link>, "9"),
    getItem(<Link href="/services">Service</Link>, "10"),
  ]),
  getItem(<Link href="editprofile">Edit Profile</Link>, "3", <EditOutlined />),
];

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              minHeight: 360,
              padding: "10px",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
