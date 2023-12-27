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
    <div
      className="min-h-80 mt-4 md:mt-20 px-2 md:px-10 pt-5 md:pt-10"
      style={{ backgroundColor: "var(--blue)" }}
    >
      <Row>
        <Col md={8} sm={24}>
          <div className="px-5 pt-4 text-white">
            <h5 className="text-uppercase mb-3 text-2xl font-bold font-mono">
              PaintXpress
            </h5>
            <p className="text-base mb-8 text-justify">
              PaintXpress will provide top-quality interior and exterior
              residential and commercial painting services. The principal
              officers of Barnum Painters believe that most companies in this
              industry suffer two major problems.
            </p>
          </div>
        </Col>
        <Col md={8} sm={24}>
          <div className="px-5 pt-4 text-start md:text-center text-white">
            <h5 className="text-uppercase mb-3 text-2xl font-bold font-mono">
              Quick Links
            </h5>
            <Link href="/services">
              <button className="text-white text-base underline">
                Services
              </button>
            </Link>
            <br />

            <Link href="/projects">
              <button className="text-white text-base underline">
                Projects
              </button>
            </Link>
            <br />

            {/*  */}

            {session?.user && (
              <button
                className="text-white text-base underline"
                onClick={() => signout()}
              >
                Logout
              </button>
            )}
            {user?.email && (
              <button
                className="text-white text-base underline"
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
                  <button className="text-white text-base underline">
                    Login
                  </button>
                </Link>
                <br />
                <Link href="/signup">
                  <button className="text-white text-base underline">
                    Signup
                  </button>
                </Link>
              </>
            )}
            <br />
          </div>
        </Col>
        <Col md={8} sm={24}>
          <div className="px-5 py-4 text-white">
            <h5 className="text-uppercase mb-3 text-2xl font-bold font-mono">
              Address
            </h5>

            <p className="text-base mb-8">
              127/10 - Dhaka <br /> Bangladesh
            </p>

            <h6 className="font-bold mb-2">Follow us-</h6>
            <hr className="mb-2" />
            <a href="https://twitter.com/?lang=en">
              <TwitterOutlined className="text-xl text-blue-950" />
            </a>

            <a className=" mx-4" href="https://www.facebook.com/">
              <FacebookOutlined className="text-xl text-white" />
            </a>

            <a href="https://www.instagram.com/">
              <InstagramOutlined className="text-xl text-red-600" />
            </a>

            <a className=" mx-4" href="https://www.skype.com/en/">
              <SkypeOutlined className="text-xl text-white" />
            </a>
          </div>
        </Col>
      </Row>
      <hr />

      <p className="text-center mt-4 pb-4 text-white">
        Copyright &copy;2023 All Rights Reserved | This Website is made with
        &#x003C;&#10083;&#x003E; by Afsana Meem{" "}
      </p>
    </div>
  );
};

export default Footer;
