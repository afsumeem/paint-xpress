/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/components/Layouts/Dashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import auth from "@/firebase/firebase.auth";
import usePrivateRoute from "@/privateRoute/layout";
import { Breadcrumb, Spin, message } from "antd";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
};

//

const EditProfile = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [user] = useAuthState(auth);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data) {
      message.success("Profile Updated Successfully");
      reset();
    }
  };
  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" className="text-center" />;
  }

  return (
    <div>
      <Head>
        <title>Edit Profile</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb style={{}}>
        <Breadcrumb.Item>Edit Profile</Breadcrumb.Item>
        <Breadcrumb.Item>{user?.email}</Breadcrumb.Item>
      </Breadcrumb>
      <h2
        className="text-center text-3xl font-semibold my-4 upper"
        style={{ color: "var(--blue)", fontSize: "var(--font)" }}
      >
        Edit Your Profile
      </h2>
      <hr />
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-white p-10 ">
            <div className="flex w-full gap-5">
              <div className="w-full">
                <input
                  {...register("firstName")}
                  required
                  placeholder="First Name"
                  className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
                />
              </div>
              <div className="w-full">
                <input
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
                />
              </div>
            </div>

            <input
              placeholder="Email"
              type="email"
              defaultValue={user?.email || ""}
              {...register("email")}
              required
              className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
            />
            <input
              placeholder="Contact"
              type="text"
              {...register("contact")}
              required
              className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
            />
            <input
              placeholder="Address"
              type="text"
              {...register("address")}
              required
              className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
            />

            <button
              type="submit"
              className="px-6 py-2 block m-auto first-letter:uppercase mt-6 text-white font-bold"
              style={{ backgroundColor: "var(--blue)" }}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

EditProfile.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
