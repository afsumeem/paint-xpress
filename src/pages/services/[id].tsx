/* eslint-disable @next/next/no-img-element */

import RootLayout from "@/components/Layouts/RootLayout";
import { IProjects, IServices } from "@/types/global";
import { Col, Row, message } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { PhoneOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hook";
import { addToBookingList } from "@/redux/features/services/serviceSlice";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

//

interface IProps {
  service: IServices;
  projects: IProjects[];
}

const SingleService = ({ service, projects }: IProps) => {
  const dispatch = useAppDispatch();

  const handleAddToBookingList = (service: IServices) => {
    dispatch(addToBookingList(service));
    message.success("Service booked");
  };

  return (
    <div className="mt-8 mx-10">
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
            href: "/services",
            title: (
              <>
                <span>Services</span>
              </>
            ),
          },
          {
            title: <>{service.title}</>,
          },
        ]}
      />
      <div className="mb-20 ">
        <Row gutter={30}>
          <Col sm={24} md={12} lg={12}>
            <img
              src={service?.image}
              alt="service img"
              // height={500}
              // width={500}
              className="w-full"
            />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <div className="">
              <h2
                className="font-bold uppercase mb-2"
                style={{ color: "var(--blue)", fontSize: "25px" }}
              >
                {service.title}
              </h2>
              <p className="text-xl mb-2">{service.category}</p>
              <hr />
              <p className="my-8 text-base">
                {service.description}

                <br />
              </p>
              <h3 className="text-3xl mb-2 ">$ {service.price}</h3>
              <div className=" font-semibold flex justify-end ">
                <div>
                  <p className="mb-4">
                    <PhoneOutlined /> {service.contact}
                  </p>
                  <h5 className="">MON - FRI: 9 AM - 10 PM</h5>
                  <h5>SATURDAY: 9 AM - 6 PM</h5>
                </div>
              </div>
              <h2>Average Rating</h2>
              <ReactStars
                count={5}
                value={service.rating}
                size={24}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />{" "}
              <div className="mt-4">
                <hr />
                <h3 className="font-bold uppercase mt-4">Reviews</h3>
                <div className="my-4">
                  {service.reviews.map((review, i) => (
                    <div key={i} className="my-4">
                      <h2 className="font-semibold">{review.name}</h2>
                      <h2 className="italic">{review.designation}</h2>
                      <p className="text-lg"> - {review.comment}</p>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <button
                className="w-full font-bold transition duration-700 uppercase py-2 rounded-md text-white"
                style={{ backgroundColor: "var(--blue)" }}
                onClick={() => handleAddToBookingList(service)}
                // disabled={buttonClicked}
              >
                book now
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <hr />
      {/*  */}
      <div className="mx-10 mt-6">
        <div className="mb-10 section-title">
          <h4
            className="font-bold text-xl uppercase"
            style={{ color: "var(--blue)", fontSize: "var(--font)" }}
          >
            Relevant Projects
          </h4>
          <h2 className="text-2xl font-semibold uppercase font-mono">
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
                <h2
                  className="uppercase font-bold mb-4"
                  style={{ color: "var(--blue)" }}
                >
                  {project.name}
                </h2>
                <div className="project-cover-card bg-black overflow-hidden hover:cursor-pointer">
                  <Link href="/projects ">
                    <img
                      className="w-full h-52 hover:opacity-50  opacity-70 transition hover:scale-125 duration-1000"
                      src={project.image}
                      alt="latest projects image"
                    />
                  </Link>
                  <div className="project-tag">
                    <p
                      className="p-2 m-2 font-semibold text-white uppercase"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
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
          <button
            className="px-6 py-2 uppercase mt-6 text-white font-bold block m-auto mb-4"
            style={{ backgroundColor: "var(--blue)" }}
          >
            See all Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleService;

SingleService.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
//

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://paintxpress-server.vercel.app/services");
  const services = await res.json();

  const paths = services?.map((service: IServices) => ({
    params: { id: service._id },
  }));
  return { paths, fallback: false };
};

//

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const res = await fetch(
    `https://paintxpress-server.vercel.app/services/${params?.id}`
  );
  const service = await res.json();

  //projects
  const response = await fetch(
    "https://paintxpress-server.vercel.app/projects"
  );
  const projects = await response.json();
  //   const singleProject = projects.map((project: IProjects) => project);

  const filteredProjects = projects.filter(
    (project: IProjects) => project.category === service.category
  );
  console.log(filteredProjects);

  return { props: { service, projects: filteredProjects } };
};
