/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/components/Layouts/Dashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import auth from "@/firebase/firebase.auth";
import { Breadcrumb, message } from "antd";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSession } from "next-auth/react";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

//

const EditProfile = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { data: session } = useSession();

  const [user] = useAuthState(auth);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data) {
      message.success("Profile Updated Successfully");
      reset();
    }
  };

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
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Edit Profile</Breadcrumb.Item>
        <Breadcrumb.Item>{user?.email || session?.user?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-white p-10 ">
            <h2 className="text-center text-3xl font-semibold mb-5 upper">
              Edit Your Profile
            </h2>
            <div className="flex w-full gap-5">
              <div>
                <input
                  {...register("firstName")}
                  required
                  placeholder="First Name"
                  className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
                />
              </div>
              <div className="">
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
              defaultValue={session?.user?.email || user?.email || ""}
              {...register("email")}
              required
              className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
            />

            <button
              type="submit"
              className="px-6 py-2 block m-auto bg-sky-600 uppercase mt-6 text-white font-bold"
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
