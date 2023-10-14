import React from "react";
import type { MenuProps } from "antd";
import { Button, Divider, Menu } from "antd";
import Link from "next/link";
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import BookingList from "../UI/BookingList";
import { useSession, signOut } from "next-auth/react";

//

const Navbar: React.FC = () => {
  const { data: session } = useSession();

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
          // items={items}
        >
          <Link href="/" target="_blank" rel="noopener noreferrer">
            Home
          </Link>
          <Link href="/about" target="_blank" rel="noopener noreferrer">
            About
          </Link>

          <Link href="/services" target="_blank" rel="noopener noreferrer">
            Services
          </Link>
          <Link href="/team" target="_blank" rel="noopener noreferrer">
            Our Team
          </Link>
          <Link href="/contact" target="_blank" rel="noopener noreferrer">
            Contact
          </Link>

          {session?.user ? (
            <>
              <Button onClick={() => signOut()}>LogOut</Button>
              <h2>{session?.user?.name}</h2>
            </>
          ) : (
            <>
              <Link href="/login" target="_blank" rel="noopener noreferrer">
                Login
              </Link>
              <Link href="/signup" target="_blank" rel="noopener noreferrer">
                SignUp
              </Link>
            </>
          )}
        </Menu>
        <Dropdown
          // menu={{ items }}
          trigger={["click"]}
          className="cursor-pointer lg:invisible "
          dropdownRender={(menu) => (
            <>
              <Link href="/" target="_blank" rel="noopener noreferrer">
                Home
              </Link>
              <Link href="/about" target="_blank" rel="noopener noreferrer">
                About
              </Link>

              <Link href="/services" target="_blank" rel="noopener noreferrer">
                Services
              </Link>
              <Link href="/team" target="_blank" rel="noopener noreferrer">
                Our Team
              </Link>
              <Link href="/contact" target="_blank" rel="noopener noreferrer">
                Contact
              </Link>

              {session?.user ? (
                <Button onClick={() => signOut()}>LogOut</Button>
              ) : (
                <>
                  <Link href="/login" target="_blank" rel="noopener noreferrer">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </>
          )}
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
