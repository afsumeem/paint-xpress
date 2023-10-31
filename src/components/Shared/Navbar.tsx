import { Menu, Spin, message } from "antd";
import Link from "next/link";
import { BarsOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import BookingList from "@/components/UI/BookingList";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";

//

const Navbar: React.FC = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const [user] = useAuthState(auth);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="flex items-center justify-between w-full text-lg  px-10 py-2">
      <Link href="/">
        <h2 className="text-2xl" style={{ color: "var(--blue)" }}>
          <span className="text-5xl font-bold font-mono">P</span>
          aintxpress
        </h2>
      </Link>

      <div className="flex items-center justify-center">
        <div className="navigationLinks">
          <Menu
            overflowedIndicator={false}
            className=" gap-2"
            mode="horizontal"
          >
            <Link href="/">
              <button className="navLink">Home</button>
            </Link>

            <Link href="/services">
              <button className="navLink">Services</button>
            </Link>

            <Link href="/projects">
              <button className="navLink">Projects</button>
            </Link>

            <Link href="/team">
              <button className="navLink ">Our Team</button>
            </Link>

            <Dropdown
              // menu={{ items }}
              trigger={["click"]}
              className="cursor-pointer mx-2"
              dropdownRender={() => (
                <div
                  className=" flex flex-col shadow-inner  text-center"
                  style={{
                    backgroundColor: "black",
                  }}
                >
                  {user?.email ? (
                    <div style={{ borderBottom: "1px solid var(--blue2)" }}>
                      {" "}
                      <h2
                        style={{
                          color: "var(--blue)",
                          fontSize: "15px",
                        }}
                        className="px-8 py-2"
                      >
                        {user?.email}
                      </h2>{" "}
                    </div>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className="dropdownNav w-full transition duration-500 px-8 py-2">
                          Login
                        </button>
                      </Link>

                      <Link href="/signup">
                        <button className="dropdownNav w-full transition duration-500 px-8 py-2">
                          SignUp
                        </button>
                      </Link>
                    </>
                  )}
                  {user?.email && (
                    <>
                      <Link href="/profile">
                        <button className="dropdownNav w-full transition duration-500 px-8 py-2 ">
                          Profile
                        </button>
                      </Link>
                      <Link href="/userprofile">
                        {" "}
                        <button className="dropdownNav w-full transition duration-500 px-8 py-2 ">
                          Dashboard
                        </button>
                      </Link>
                      <div>
                        <button
                          className="dropdownNav w-full transition duration-500 px-8 py-2"
                          onClick={async () => {
                            const success = await signOut();
                            if (success) {
                              message.success("You are logged out");
                            }
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()} className="text-xl mt-4">
                <Space>
                  <UserOutlined style={{ color: "var(--blue)" }} />
                </Space>
              </a>
            </Dropdown>

            {/*  */}
          </Menu>
        </div>

        {/*  booking list icon*/}

        <BookingList />

        {/*  */}

        <Dropdown
          // menu={{ items }}
          trigger={["click"]}
          className="cursor-pointer lg:invisible mx-2"
          dropdownRender={() => (
            <div className="flex flex-col  shadow-inner bg-black">
              {user?.email && (
                <Link href="/profile">
                  <button className="dropdownNav w-full transition duration-500 px-20">
                    Profile
                  </button>
                </Link>
              )}
              <Link href="/">
                {" "}
                <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                  Home
                </button>
              </Link>

              <Link href="/services">
                {" "}
                <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                  Services
                </button>
              </Link>

              <Link href="/projects">
                <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                  Projects
                </button>
              </Link>

              <Link href="/team">
                {" "}
                <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                  Our Team
                </button>
              </Link>

              {user?.email && (
                <>
                  <Link href="/userprofile">
                    {" "}
                    <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="dropdownNav w-full transition duration-500 px-20 py-2"
                    onClick={async () => {
                      const success = await signOut();
                      if (success) {
                        message.success("You are logged out");
                      }
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
              {user?.email ? (
                <>
                  <h2 className="text-xl text-center">{user?.email}</h2>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                      Login
                    </button>
                  </Link>

                  <Link href="/signup">
                    <button className="dropdownNav w-full transition duration-500 px-20 py-2">
                      SignUp
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()} className="text-2xl">
            <Space>
              <BarsOutlined style={{ color: "var(--blue)" }} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
