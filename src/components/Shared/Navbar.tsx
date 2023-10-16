import { Menu, Spin } from "antd";
import Link from "next/link";
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import BookingList from "../UI/BookingList";
import { useSession, signOut as signout } from "next-auth/react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import logoImg from "@/assests/images/logo.JPG";
import Image from "next/image";

//

const Navbar: React.FC = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const { data: session } = useSession();

  const [user] = useAuthState(auth);

  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <div className="flex items-center justify-between w-full text-lg my-0">
      <Link href="/">
        <Image
          src={logoImg}
          alt="paint service logo"
          height={100}
          width={200}
          className="my-2"
        />
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

            <Link href="/team" target="_blank">
              <button className="navLink ">Our Team</button>
            </Link>
            <Link href="/contact">
              {" "}
              <button className="navLink ">Contact</button>
            </Link>

            {/*  */}
            {session?.user && (
              <>
                <button
                  className="navLink "
                  style={{ backgroundColor: "skyblue" }}
                  onClick={() => signout()}
                >
                  LogOut
                </button>
                <Link href="/profile">
                  {" "}
                  <button className="navLink ">Dashboard</button>
                </Link>
              </>
            )}

            {user?.email && (
              <>
                <button
                  className="navLink"
                  onClick={async () => {
                    const success = await signOut();
                    if (success) {
                      alert("You are sign out");
                    }
                  }}
                >
                  Logout
                </button>
                <Link href="/profile">
                  {" "}
                  <button className="navLink ">Dashboard</button>
                </Link>
              </>
            )}

            {session?.user || user?.email ? (
              <div className="flex items-center justify-center">
                <h2 className="text-xl">
                  {session?.user?.name || user?.email}
                </h2>
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
          className="cursor-pointer lg:invisible "
          dropdownRender={() => (
            <div className="flex flex-col bg-white py-6  gap-2 border border-blue-900 shadow-inner">
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
              <Link href="/contact">
                {" "}
                <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                  Contact
                </button>
              </Link>

              {/* {session?.user ? (
                <Button onClick={() => signOut()}>LogOut</Button>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/signup">SignUp</Link>
                </>
              )} */}

              {session?.user && (
                <>
                  <Link href="/profile">
                    {" "}
                    <button className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 ">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="hover:bg-sky-300 transition duration-500 px-20  border-b  text-sky-400 text-base w-full hover:text-black py-2 "
                    onClick={() => signout()}
                  >
                    LogOut
                  </button>
                </>
              )}
              {user?.email && (
                <>
                  <Link href="/profile">
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
              {session?.user || user?.email ? (
                <>
                  <h2 className="text-xl text-center">
                    {session?.user?.name || user?.email}
                  </h2>
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
          <a onClick={(e) => e.preventDefault()} className="mr-6 text-2xl">
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
