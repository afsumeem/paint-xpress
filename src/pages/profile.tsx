/* eslint-disable @next/next/no-img-element */

import RootLayout from "@/components/Layouts/RootLayout";
import auth from "@/firebase/firebase.auth";
import { Breadcrumb, Col, Row, Space, Spin, message } from "antd";
import Head from "next/head";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import userImg from "../assests/images/user.png";
import Image from "next/image";
import usePrivateRoute from "@/privateRoute/layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hook";
import Table, { ColumnsType } from "antd/es/table";
import { IServices } from "@/types/global";

//

interface IFormInput {
  cNumber: string;
  street: string;
  apt: string;
  country: string;
  city: string;
  state: string;
  zip: string;
}
//
interface DataType {
  key: string;
  title: string;
  price: number;
  category: string;
  rating: number;
}
//

interface DataType extends IServices {}

//

const Profile = () => {
  const { services } = useAppSelector((state) => state.bookingList);

  const [signOut] = useSignOut(auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const [user] = useAuthState(auth);
  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" />;
  }

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    message.success("payment done");
    reset();
  };

  //
  const columns: ColumnsType<IServices> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

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

      <hr />
      <div className="mt-4">
        <Row gutter={30}>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={6}
            className=" border-r-none md:border-r-2 "
          >
            <div className="block m-auto">
              <h2 className="text-2xl font-bold text-center my-6">
                Welcome Back!
              </h2>
              <div className="flex items-center justify-center">
                <h2 className="text-xl">{user?.email}</h2>
              </div>
              <Image
                src={userImg}
                width={80}
                height={80}
                alt="Picture of the author"
                className="block m-auto my-10"
              />
              <div className="flex justify-center items-center">
                <button className="navLink">
                  <Link href="/editprofile">Edit Profile</Link>
                </button>
                |
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
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            <Breadcrumb
              style={{ marginBottom: "25px" }}
              items={[
                {
                  href: "/",
                  title: (
                    <>
                      <HomeOutlined />
                      <span>Home</span>
                    </>
                  ),
                },
                {
                  title: (
                    <>
                      <span>{user?.email}</span>
                    </>
                  ),
                },
              ]}
            />

            <div className="mt-8">
              <h2 className="text-center text-2xl font-bold uppercase mb-2">
                Enter Your Payment Details
              </h2>
              <hr />
              <div className="mt-4 p-6 w-3/4 lg:2/4 block m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    className="w-full py-4 px-2 block m-auto     bg-slate-100 text-black border border-stone-300"
                    placeholder="Card Number (MM / YY / CVC)"
                    required
                    {...register("cNumber", { required: true })}
                  />
                  <br />
                  <input
                    className="w-full py-4 px-2 block m-auto   mt-2 bg-slate-100 text-black border border-stone-300"
                    placeholder="Street Address"
                    type="text"
                    required
                    {...register("street", { required: true })}
                  />
                  <br />
                  <input
                    className="w-full py-4 px-2 block m-auto   mt-2 bg-slate-100 text-black border border-stone-300"
                    placeholder="Apt, unit, suite, ect (optional)"
                    type="text"
                    required
                    {...register("apt")}
                  />
                  <br />
                  <input
                    className="w-full py-4 px-2 block m-auto   mt-2 bg-slate-100 text-black border border-stone-300"
                    placeholder="Country"
                    type="text"
                    required
                    {...register("country", { required: true })}
                  />
                  <br />
                  <div className="flex flx-col md:flex-row gap-2">
                    <input
                      className="w-full py-4 px-2 block m-auto    mt-2 bg-slate-100 text-black border border-stone-300"
                      placeholder="City"
                      type="text"
                      required
                      {...register("city", { required: true })}
                    />{" "}
                    <input
                      className="w-full py-4 px-2 block m-auto    mt-2 bg-slate-100 text-black border border-stone-300"
                      placeholder="State"
                      type="text"
                      required
                      {...register("state", { required: true })}
                    />{" "}
                    <input
                      className="w-full py-4 px-2 block m-auto   mt-2 bg-slate-100 text-black border border-stone-300"
                      placeholder="Zip Code"
                      type="text"
                      required
                      {...register("zip", { required: true })}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" w-full mt-4 bg-blue-600 text-white block mx-auto p-2 rounded "
                  >
                    Pay
                  </button>
                </form>
              </div>
            </div>
            <div>
              {services.length === 0 ? (
                <h2 className="text-red-500 text-xl">
                  <Link href="/services">Booking Services</Link>
                </h2>
              ) : (
                <>
                  <div>
                    <h3 className="text-3xl text-center mb-6">
                      Booking History
                    </h3>
                    <hr className="mb-4" />
                  </div>
                  <Table columns={columns} dataSource={services} />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
