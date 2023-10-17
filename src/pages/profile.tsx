/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/components/Layouts/Dashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import auth from "@/firebase/firebase.auth";
import { Breadcrumb, Spin, message } from "antd";
import Head from "next/head";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useSession, signOut as signout } from "next-auth/react";
import Link from "next/link";
import userImg from "../assests/images/user.png";
import Image from "next/image";
import usePrivateRoute from "@/privateRoute/layout";

//

const UserProfilePage = () => {
  const [signOut, error] = useSignOut(auth);
  const { data: session } = useSession();

  const [user] = useAuthState(auth);
  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" />;
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
        <Breadcrumb.Item>{user?.email || session?.user?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
        <div className=" flex justify-end">
          <button className="navLink">
            <Link href="/editprofile">Edit Profile</Link>
          </button>
          {session?.user && (
            <>
              <button
                className="navLink "
                style={{ backgroundColor: "skyblue" }}
                onClick={() => signout()}
              >
                LogOut
              </button>
            </>
          )}

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
          <h2 className="text-xl">{session?.user?.name || user?.email}</h2>
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

export default UserProfilePage;

UserProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
