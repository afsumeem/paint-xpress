/* eslint-disable @next/next/no-img-element */
import RootLayout from "@/components/Layouts/RootLayout";
import { useGetServicesQuery } from "@/redux/features/services/serviceApi";
import { IServices } from "@/types/global";
import { Breadcrumb, Col, Row, Spin, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToBookingList } from "@/redux/features/services/serviceSlice";
import { HomeOutlined } from "@ant-design/icons";
//

interface IProps {
  services: IServices[];
  categories: string[];
}

const ServicePage = ({ services, categories }: IProps) => {
  //search and filter functionality for books

  const [selectCategory, setSelectCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useGetServicesQuery({
    search: searchText,
    category: selectCategory,
  });

  const dispatch = useAppDispatch();

  const [buttonClicked, setButtonClicked] = useState(false);

  // const handleAddToBookingList = (service: IServices) => {
  //   dispatch(addToBookingList(service));
  //   message.success("Service booked");
  // };

  const selectedService = useAppSelector((state) => state.bookingList.services);

  const handleAddToBookingList = (service: IServices) => {
    // if (!buttonClicked) {
    dispatch(addToBookingList(service));
    message.success("Service booked");
    // setButtonClicked(true);
    // } else {
    //   message.warning("Service already booked");
    // }
  };

  return (
    <div className="mx-10 mt-10">
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
                <span>Services</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-10 section-title">
        <h4 className="font-bold text-md text-sky-400 uppercase ">
          Our Services
        </h4>
        <h2 className="text-2xl font-semibold uppercase font-mono">
          We Provide Superior Paint Service
        </h2>
        <hr />
      </div>

      <Row gutter={20}>
        <Col sm={24} md={6} lg={6}>
          <form className=" my-2">
            <label htmlFor="" className="font-semibold text-lg">
              {" "}
              Search Services
            </label>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              className=" w-full py-2 border rounded-md border-black px-2"
              placeholder="Search Services"
            />
          </form>
          <hr />
          <h2 className="my-4 font-semibold text-lg">Select a Category</h2>
          {categories?.map((category, i) => (
            <div key={i}>
              <input
                onChange={() => setSelectCategory(category)}
                className="h-3 w-3"
                id={category}
                type="radio"
                name="category"
                checked={selectCategory === category}
              />
              <label className="text-[14px] ml-4" htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
          <button
            onClick={() => {
              setSelectCategory("");
            }}
            className=" mt-4 w-full rounded-none text-blue-950 hover:text-white py-2   bg-sky-400 hover:bg-sky-950 transition duration-1000"
          >
            Reset category
          </button>
        </Col>
        <Col sm={24} md={18} lg={18}>
          {data?.length === 0 ? (
            <h2 className="font-mono text-4xl text-center mt-40 text-red-500">
              Data not found!!
            </h2>
          ) : (
            <>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <Row gutter={20}>
                  {data?.map((service: IServices, i: number) => (
                    <Col
                      key={i}
                      span={6}
                      data-aos="zoom-in-up"
                      data-aos-duration="1200"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={8}
                      className="section-card mb-10  gutter-row"
                    >
                      <div className="mt-4">
                        <div className="bg-black overflow-hidden">
                          <Link href={`/services/${service._id}`}>
                            <img
                              src={service?.image}
                              alt="service img"
                              // height={500}
                              // width={500}
                              className="w-full md:h-52 hover:opacity-70 transition hover:scale-125 duration-1000"
                            />
                          </Link>
                        </div>

                        <div
                          className="mx-2 p-6 -mt-6  shadow-xl h-90"
                          style={{ background: "white", position: "sticky" }}
                        >
                          <Link href={`/services/${service._id}`}>
                            <h2 className="text-xl uppercase text-sky-500">
                              {service.title}
                            </h2>
                          </Link>
                          <hr />
                          <p className="my-4 text-base">
                            {service.description}
                            <br />
                            <Link href={`/services/${service._id}`}>
                              <span className="underline">See details</span>
                            </Link>
                          </p>
                          <h3 className="text-xl mb-2 font-bold">
                            $ {service.price}
                          </h3>
                          <p className="mb-4">
                            {" "}
                            <PhoneOutlined /> {service.contact}
                          </p>
                          <hr />

                          <button
                            className="w-full bg-sky-200 font-bold hover:bg-sky-400 transition duration-700 uppercase py-2 rounded-md"
                            onClick={() => handleAddToBookingList(service)}
                            // disabled={buttonClicked}
                          >
                            book now
                          </button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>

      {/* <form className="join mx-auto w-2/3">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered join-item w-full md:w-2/3 md:mx-auto"
          placeholder="Search here"
        />
      </form> */}

      {/*  */}
      {/* <button
        onClick={() => {
          setSelectCategory("");
        }}
        className="btn w-full rounded-none text-blue-950 hover:text-white  bg-slate-400 hover:bg-blue-950 transition duration-1000"
      >
        Reset category
      </button> */}
      {/* {categories?.map((category, i) => (
        <li key={i}>
          <input
            onChange={() => setSelectCategory(category)}
            className="h-3 w-3"
            id={category}
            type="radio"
            name="category"
            checked={selectCategory === category}
          />
          <label className="text-[14px] ml-4" htmlFor={category}>
            {category}
          </label>
        </li>
      ))} */}

      {/*  */}
    </div>
  );
};

export default ServicePage;

ServicePage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  //fetch latest projects
  const response = await fetch("http://localhost:5000/projects");
  const projects = await response.json();

  //

  const projectsCategories = projects.map(
    (project: IServices) => project.category
  );
  const uniqueCategories = projectsCategories.filter(
    (category: string, i: number, currentVal: string[]) =>
      currentVal.indexOf(category) === i
  );

  return {
    props: {
      projects,
      categories: uniqueCategories,
    },
    revalidate: 5,
  };
};
