/* eslint-disable @next/next/no-img-element */
import { IProjects } from "@/types/global";
import { Col, Modal, Row } from "antd";
import Link from "next/link";
import AOS from "aos";
import { useEffect, useState } from "react";

//
interface IProps {
  projects: IProjects[];
}

const LatestProjects = ({ projects }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="mx-10 mt-20">
      <div className="mb-2 md:md:10 section-title">
        <h4
          style={{ color: "var(--blue)", fontSize: "var(--font)" }}
          className="font-bold uppercase "
        >
          Latest Projects
        </h4>
        <h2
          // style={{ fontSize: "var(--titleFont)" }}
          className=" font-mono font-semibold uppercase text-xl md:text-3xl"
        >
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
            <div className="shadow-lg p-2 md:p-6 h-96">
              <div className="project-cover-card bg-black overflow-hidden hover:cursor-pointer mb-4">
                <img
                  className="w-full h-60 opacity-70 transition project-cover-img hover:scale-125 duration-1000 project-img"
                  src={project.image}
                  alt="latest projects image"
                />
                {/* <div className="middle"> */}
                <button
                  onClick={showModal}
                  style={{ backgroundColor: "var(--blue)" }}
                  className="view-project-btn p-2  transition duration-1000 text-white"
                >
                  View Project
                </button>
                {/* </div> */}
                <div className="project-tag">
                  <p
                    style={{ backgroundColor: "var(--blue)" }}
                    className=" p-2 m-2 font-semibold text-white uppercase "
                  >
                    {project.category}
                  </p>
                </div>

                <h5 className="bg-white text-black uppercase py-2 px-4 project-duration">
                  {project.duration}
                </h5>
              </div>
              <hr />
              <h2 className="uppercase font-bold text-lg my-4">
                {project.name}
              </h2>
            </div>
            <Modal
              title={project.name}
              open={isModalOpen}
              onOk={handleOk}
              centered
              onCancel={handleCancel}
            >
              <img
                className="w-full h-64 transition duration-1000"
                src={project.image}
                alt="latest projects image"
              />

              <p className=" mt-2 uppercase underline">{project.category}</p>

              <h5 className=" text-black uppercase pt-2 font-semibold">
                Duration: {project.duration}
              </h5>

              <p className="my-4 text-base">{project.description}</p>

              <Row gutter={5}>
                {project.tags.map((tag, i) => (
                  <Col key={i} className=" ">
                    <h3 className="font-mono border px-2 mt-4">{tag} </h3>
                  </Col>
                ))}
              </Row>
            </Modal>
          </Col>
        ))}
      </Row>

      <Link href="/projects ">
        <button
          style={{ backgroundColor: "var(--blue)" }}
          className="px-6 py-2 uppercase mt-6 text-white font-bold block m-auto mb-4"
        >
          See all Projects
        </button>
      </Link>
    </div>
  );
};

export default LatestProjects;
