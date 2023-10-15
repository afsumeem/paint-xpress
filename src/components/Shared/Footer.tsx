import { Col, Row, Spin } from "antd";
import Link from "next/link";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SkypeOutlined,
} from "@ant-design/icons";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import { useSession, signOut as signout } from "next-auth/react";

//

const Footer = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const { data: session } = useSession();

  const [user] = useAuthState(auth);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="bg-sky-400 h-80 mt-20 p-10">
      <Row>
        <Col md={8} sm={24}>
          <div className="px-5 pt-4">
            <h5 className="text-uppercase mb-3 text-2xl font-bold font-mono">
              PaintXpress
            </h5>
            <p className="text-base mb-8">
              PaintXpress will provide top-quality interior and exterior
              residential and commercial painting services. The principal
              officers of Barnum Painters believe that most companies in this
              industry suffer two major problems.
            </p>
          </div>
        </Col>
        <Col md={8} sm={24}>
          <div className="px-5 pt-4 text-center ">
            <h5 className="text-uppercase mb-3 text-2xl font-bold font-mono">
              Quick Links
            </h5>
            <Link href="/services">
              <button className="text-black text-base underline">
                Services
              </button>
            </Link>
            <br />

            <Link href="/projects">
              <button className="text-black text-base underline">
                Projects
              </button>
            </Link>
            <br />

            {/*  */}

            {session?.user && (
              <button
                className="text-black text-base underline"
                onClick={() => signout()}
              >
                Logout
              </button>
            )}
            {user?.email && (
              <button
                className="text-black text-base underline"
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    alert("You are sign out");
                  }
                }}
              >
                Logout
              </button>
            )}

            {/*  */}
            {session?.user || user?.email ? (
              <>
                <h2>{session?.user?.name || user?.email}</h2>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-black text-base underline">
                    Login
                  </button>
                </Link>
                <br />
                <Link href="/signup">
                  <button className="text-black text-base underline">
                    Signup
                  </button>
                </Link>
              </>
            )}
            <br />
          </div>
        </Col>
        <Col md={8} sm={24}>
          <div className="px-5 pt-4  ">
            <h5 className="text-uppercase mb-3 text-2xl font-bold font-mono">
              Address
            </h5>

            <p className="text-base mb-8">
              127/10 - Dhaka <br /> Bangladesh
            </p>

            <h6 className="font-bold mb-2">Follow us-</h6>
            <hr />
            <a
              className="text-3xl text-blue-900"
              href="https://twitter.com/?lang=en"
            >
              <TwitterOutlined />
            </a>

            <a
              className="text-3xl text-blue-950 mx-4"
              href="https://www.facebook.com/"
            >
              <FacebookOutlined />
            </a>

            <a
              className="text-3xl text-red-600"
              href="https://www.instagram.com/"
            >
              <InstagramOutlined />
            </a>

            <a className="text-3xl mx-4" href="https://www.skype.com/en/">
              <SkypeOutlined />
            </a>
          </div>
        </Col>
      </Row>
      <hr className="" />

      <p className=" text-center m-4">
        Copyright &copy;2023 All Rights Reserved | This Website is made with
        &#x003C;&#10083;&#x003E; by Afsana Meem{" "}
      </p>
    </div>
  );
};

export default Footer;
