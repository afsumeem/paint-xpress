/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
import RootLayout from "@/components/Layouts/RootLayout";
import { useGetServicesQuery } from "@/redux/features/services/serviceApi";
import { IServices } from "@/types/global";
import { Breadcrumb, Col, Pagination, Row, Slider, Spin, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToBookingList } from "@/redux/features/services/serviceSlice";
import { HomeOutlined } from "@ant-design/icons";
import { setPriceRange } from "@/redux/features/service/servicesSlice";
import Image from "next/image";

//

interface IProps {
  services: IServices[];
  categories: string[];
}

const ServicePage = ({ categories }: IProps) => {
  //search and filter functionality for services

  const [selectCategory, setSelectCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  //sort by pricerange
  const { price } = useAppSelector((state) => state.services);

  const dispatch = useAppDispatch();

  ////////////////////
  const [data, setData] = useState([]);
  const { data: fetchedData, isLoading } = useGetServicesQuery({
    search: searchText,
    category: selectCategory,
  });

  useEffect(() => {
    if (!isLoading && fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData, isLoading]);

  ///////////////
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const displayServices = data?.slice(startIndex, endIndex);

  const handleAddToBookingList = (service: IServices) => {
    dispatch(addToBookingList(service));
    message.success("Service booked");
  };

  const onChange = (newValue: number[]) => {
    if (newValue !== null) {
      dispatch(setPriceRange(newValue[0]));
    }
  };
  let productsData;
  if (price > 0) {
    productsData = data?.filter(
      (item: { price: number }) => item.price < price
    );
  } else {
    productsData = data;
  }

  return (
    <div className="mx-10 mt-10">
      <div className="mb-10 section-title">
        <h4
          className="font-bold uppercase "
          style={{ color: "var(--blue)", fontSize: "var(--font)" }}
        >
          Our Services
        </h4>
        <h2
          className="text-2xl font-semibold uppercase font-mono"
          style={{ fontSize: "var(--titleFont)" }}
        >
          We Provide Superior Paint Service
        </h2>
        <hr />
      </div>

      <Row gutter={20}>
        <Col sm={24} md={6} lg={6}>
          <hr />
          <div className="my-4">
            <h1
              className="text-lg uppercase font-semibold mb-4"
              style={{ color: "var(--blue)", fontSize: "var(--font)" }}
            >
              Price Range
            </h1>
            <div className="max-w-xl border p-2">
              <div className="font-semibold">
                <h2>$0 To {price}</h2>
              </div>
              <Slider
                range
                defaultValue={[2200]}
                min={0}
                max={2200}
                onChange={(value) => onChange(value)}
              />
            </div>
          </div>
          <hr />
          <h2
            className="my-4 font-semibold text-lg"
            style={{ color: "var(--blue)", fontSize: "var(--font)" }}
          >
            Select a Category
          </h2>
          <button
            onClick={() => {
              setSelectCategory("");
            }}
            className=" w-full rounded-none text-white py-2 mb-4  transition duration-1000"
            style={{ backgroundColor: "var(--blue)" }}
          >
            Reset category
          </button>
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
        </Col>
        <Col sm={24} md={18} lg={18}>
          <div className="flex flex-col md:flex-row justify-between items-center">
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
            <form className=" my-2">
              <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                className=" py-2 border rounded-md border-black px-2"
                placeholder="Search Services"
                style={{ width: "250px" }}
              />
            </form>
          </div>
          {productsData?.length === 0 ? (
            <h2 className="font-mono text-4xl text-center mt-40 text-red-500">
              Data not found!!
            </h2>
          ) : (
            <>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <Row gutter={20}>
                  {displayServices?.map((service: IServices, i: number) => (
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
                            <Image
                              src={service?.image}
                              alt="service img"
                              height={500}
                              width={500}
                              className="w-full md:h-56 2xl:h-96 hover:opacity-70 transition hover:scale-125 duration-1000"
                            />
                          </Link>
                        </div>

                        <div
                          className="mx-2 p-6 -mt-6 h-96 shadow-xl flex flex-col justify-between"
                          style={{
                            background: "white",
                            position: "sticky",
                            // minHeight: "340px",
                          }}
                        >
                          <div>
                            <Link href={`/services/${service._id}`}>
                              <h2
                                className="uppercase"
                                style={{
                                  color: "var(--blue)",
                                  fontSize: "var(--font)",
                                }}
                              >
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
                            <p className="mb-4 underline">
                              {" "}
                              {service.category}
                            </p>
                            <hr />
                          </div>

                          <button
                            className="w-full font-bold  transition duration-700 uppercase py-2 rounded-md text-white"
                            style={{
                              backgroundColor: "var(--blue)",
                            }}
                            onClick={() => handleAddToBookingList(service)}
                          >
                            book now
                          </button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
              <Pagination
                current={currentPage}
                total={data.length}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ServicePage;

ServicePage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  //fetch latest projects
  const response = await fetch(
    "https://paintxpress-server.vercel.app/projects"
  );
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
