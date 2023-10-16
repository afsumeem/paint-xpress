import React, { useState } from "react";
import {
  HistoryOutlined,
  BookOutlined,
  EditOutlined,
  NotificationOutlined,
  UserOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
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
  getItem(<Link href="/profile">User Profile</Link>, "", <UserOutlined />),
  getItem(
    <Link href="/bookinghistory">Booking History</Link>,
    "2",
    <HistoryOutlined />
  ),
  getItem("Edit Profile", "3", <EditOutlined />),
  getItem("User's Activities", "4", <UserOutlined />),
  getItem("Booking Status", "5", <BookOutlined />),
  getItem("Notifications Center", "6", <NotificationOutlined />),
  getItem("Quick Actions", "7", <InteractionOutlined />),
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
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
