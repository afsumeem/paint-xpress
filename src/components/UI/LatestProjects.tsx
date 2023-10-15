/* eslint-disable @next/next/no-img-element */
import { IProjects } from "@/types/global";
import { Col, Row } from "antd";
import Link from "next/link";
import AOS from "aos";
import { useEffect } from "react";

//
interface IProps {
  projects: IProjects[];
}

const LatestProjects = ({ projects }: IProps) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="mx-10 mt-20">
      <div className="mb-10 section-title">
        <h4 className="font-bold text-2xl text-sky-400 uppercase ">
          Latest Projects
        </h4>
        <h2 className="text-4xl font-semibold uppercase font-mono">
          Inspiration on Your Next Project
        </h2>
      </div>
      <Row gutter={30}>
        {projects.map((project, i) => (
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
              <h2 className="uppercase font-bold mb-4">{project.name}</h2>
              <div className="project-cover-card bg-black overflow-hidden hover:cursor-pointer">
                <Link href="/projects ">
                  <img
                    className="w-full h-52 hover:opacity-50  opacity-70 transition hover:scale-125 duration-1000"
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
                    <h3 className="font-mono  underline mt-4">{tag} </h3>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        ))}
      </Row>
      <Link href="/projects ">
        <button className="px-6 py-2 bg-sky-600 uppercase mt-6 text-white font-bold block m-auto mb-4">
          See all Projects
        </button>
      </Link>
    </div>
  );
};

export default LatestProjects;
