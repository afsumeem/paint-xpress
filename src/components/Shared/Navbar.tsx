import { Alert, Button, Menu, Spin } from "antd";
import Link from "next/link";
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import BookingList from "../UI/BookingList";
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
    <div className="flex items-center justify-between w-full text-lg  px-10">
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

            {user?.email && (
              <>
                <button
                  className="navLink"
                  onClick={async () => {
                    const success = await signOut();
                    if (success) {
                      // alert("You are sign out");
                      <Alert
                        message="Info Text"
                        description="Info Description Info Description Info Description Info Description"
                        type="info"
                        action={
                          <Space direction="vertical">
                            <Button size="small" type="primary">
                              Accept
                            </Button>
                            <Button size="small" danger ghost>
                              Decline
                            </Button>
                          </Space>
                        }
                        closable
                      />;
                    }
                  }}
                >
                  Logout
                </button>
                <Link href="/userprofile">
                  {" "}
                  <button className="navLink ">Dashboard</button>
                </Link>
              </>
            )}

            {user?.email ? (
              <div className="flex items-center justify-center">
                <h2 className="text-xl">{user?.email}</h2>
              </div>
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
                        alert("You are sign out");
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
