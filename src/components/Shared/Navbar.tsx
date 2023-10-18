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
        <h2 className="text-sky-500 text-2xl ">
          <span className="text-5xl text-sky-600 font-bold font-mono">P</span>
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
                <div className="p-4 flex flex-col bg-sky-200 gap-2  shadow-inner">
                  {user?.email ? (
                    <>
                      {" "}
                      <h2 className="text-lg">{user?.email}</h2> <hr />
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className="navLink ">Login</button>
                      </Link>
                      <Link href="/signup">
                        <button className="navLink">SignUp</button>
                      </Link>
                    </>
                  )}
                  {user?.email && (
                    <>
                      <Link href="/profile">
                        <button className="navLink ">Profile</button>
                      </Link>
                      <Link href="/userprofile">
                        {" "}
                        <button className="navLink ">Dashboard</button>
                      </Link>
                      <div>
                        <button
                          className="navLink "
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
                  <UserOutlined />
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
            <div className="flex flex-col bg-white gap-2 border border-blue-900 shadow-inner">
              {user?.email && (
                <Link href="/profile">
                  {" "}
                  <button className="w-full hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base  hover:text-black py-2 ">
                    Profile
                  </button>
                </Link>
              )}
              <Link href="/">
                {" "}
                <button className="w-full hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base  hover:text-black py-2 ">
                  Home
                </button>
              </Link>

              <Link href="/services">
                {" "}
                <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                  Services
                </button>
              </Link>

              <Link href="/projects">
                <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                  Projects
                </button>
              </Link>

              <Link href="/team">
                {" "}
                <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                  Our Team
                </button>
              </Link>

              {user?.email && (
                <>
                  <Link href="/userprofile">
                    {" "}
                    <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 "
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
                    <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                      Login
                    </button>
                  </Link>

                  <Link href="/signup">
                    <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
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
              <BarsOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
