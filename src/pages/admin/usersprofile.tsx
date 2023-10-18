/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/components/Layouts/Dashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import auth from "@/firebase/firebase.auth";
import { Breadcrumb, Spin, message } from "antd";
import Head from "next/head";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Link from "next/link";
import userImg from "@/assests/images/user.png";
import Image from "next/image";
import usePrivateRoute from "@/privateRoute/layout";

//

const UserProfile = () => {
  const [signOut, error] = useSignOut(auth);

  const [user] = useAuthState(auth);
  //
  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" className="text-center" />;
  }

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
        <Breadcrumb.Item>{user?.email}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
        <div className=" flex justify-end">
          <button className="navLink">
            <Link href="/editprofile">Edit Profile</Link>
          </button>

          {user?.email && (
            <>
              <button
                className="navLink"
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    message.success("You are sign out");
                  }
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
        <h2 className="text-4xl font-bold text-center my-6">Welcome Back!</h2>
        <div className="flex items-center justify-center">
          <h2 className="text-xl">{user?.email}</h2>
        </div>
        <Image
          src={userImg}
          width={100}
          height={100}
          alt="Picture of the author"
          className="block m-auto mb-10"
        />
      </div>
    </div>
  );
};

export default UserProfile;

UserProfile.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
