import React from "react";
import type { MenuProps } from "antd";
import { Badge, Menu } from "antd";
import Link from "next/link";
import { BarsOutlined, BookOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import BookingList from "../UI/BookingList";

//

const items: MenuProps["items"] = [
  {
    label: (
      <Link href="/" target="_blank" rel="noopener noreferrer">
        Home
      </Link>
    ),
    key: "home",
  },
  {
    label: (
      <Link href="/about" target="_blank" rel="noopener noreferrer">
        About
      </Link>
    ),
    key: "about",
  },
  {
    label: (
      <Link href="/services" target="_blank" rel="noopener noreferrer">
        Services
      </Link>
    ),
    key: "services",
  },
  {
    label: (
      <Link href="/team" target="_blank" rel="noopener noreferrer">
        Our Team
      </Link>
    ),
    key: "team",
  },
  {
    label: (
      <Link href="/contact" target="_blank" rel="noopener noreferrer">
        Contact
      </Link>
    ),
    key: "contact",
  },
  {
    label: (
      <Link href="/login" target="_blank" rel="noopener noreferrer">
        Login
      </Link>
    ),
    key: "login",
  },
  {
    label: (
      <Link href="/signup" target="_blank" rel="noopener noreferrer">
        SignUp
      </Link>
    ),
    key: "signup",
  },
];

const Navbar: React.FC = () => {
  // const [current, setCurrent] = useState("mail");

  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };

  return (
    <div className="flex items-center justify-between w-full text-lg">
      <Link href="/">PaintXpress</Link>
      <BookingList />

      <div className="flex">
        <Menu
          // onClick={onClick}
          // selectedKeys={[current]}
          className="invisible lg:visible"
          mode="horizontal"
          items={items}
        />
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="cursor-pointer lg:invisible "
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <BarsOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
