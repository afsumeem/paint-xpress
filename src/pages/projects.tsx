/* eslint-disable @next/next/no-img-element */
import RootLayout from "@/components/Layouts/RootLayout";
import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";
import { IProjects } from "@/types/global";
import { Breadcrumb, Col, Row, Spin } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import Head from "next/head";
import { HomeOutlined } from "@ant-design/icons";

//

interface IProps {
  projects: IProjects[];
  categories: string[];
}

const Projects = ({ categories }: IProps) => {
  //search and filter functionality for projects

  const [selectCategory, setSelectCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useGetProjectsQuery({
    search: searchText,
    category: selectCategory,
  });

  return (
    <div className="mx-10 mt-10">
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                <span>Projects</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-10 section-title">
        <h4 className="font-bold text-md text-sky-400 uppercase ">
          Latest Projects
        </h4>
        <h2 className="text-2xl font-semibold uppercase font-mono">
          Inspiration on Your Next Project
        </h2>
        <hr />
      </div>

      {/*  */}
      <Row gutter={20}>
        <Col sm={24} md={6} lg={6}>
          <form className=" my-2">
            <label htmlFor="" className="font-semibold text-lg">
              {" "}
              Search Project
            </label>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              className=" w-full py-2 border rounded-md border-black px-2"
              placeholder="Search Projects"
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
                <Row>
                  {data?.map((project: IProjects, i: number) => (
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
                      <div className="shadow-lg p-6">
                        <h2 className="uppercase font-bold mb-4">
                          {project.name}
                        </h2>
                        <div className="project-cover-card bg-black overflow-hidden hover:cursor-pointer">
                          <Link href="/projects ">
                            <img
                              className="w-full  hover:opacity-50  opacity-70 transition hover:scale-125 duration-1000"
                              src={project.image}
                              alt="latest projects image"
                            />
                          </Link>
                          <div className="project-tag">
                            <p className="bg-sky-600 p-2 m-2 font-semibold text-white uppercase ">
                              {project.category}
                            </p>
                          </div>

                          <h5 className="bg-white text-black uppercase py-2 px-4 project-duration">
                            {project.duration}
                          </h5>
                        </div>

                        <p className="my-4 text-base">
                          {project.description.slice(0, 119)}
                        </p>
                        <hr />
                        <Row gutter={5}>
                          {project.tags.map((tag, i) => (
                            <Col key={i} className=" ">
                              <h3 className="font-mono  underline mt-4">
                                {tag}{" "}
                              </h3>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>

      {/*  */}
    </div>
  );
};

export default Projects;

Projects.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  //fetch latest projects
  const response = await fetch("http://localhost:5000/projects");
  const projects = await response.json();

  //

  const projectsCategories = projects.map(
    (project: IProjects) => project.category
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
