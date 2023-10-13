// import Image from "next/image";
// import Link from "next/link";
// import ReactStars from "react-rating-stars-component";

import RootLayout from "@/components/Layouts/RootLayout";
import { IProjects, IServices } from "@/types/global";
import { GetStaticPaths, GetStaticProps } from "next";

interface IProps {
  service: IServices;
  projects: IProjects[];
}

const SingleService = ({ service, projects }: IProps) => {
  return (
    <div>
      {" "}
      <h2>{service?.title}</h2>
    </div>
  );
};

export default SingleService;

SingleService.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
//

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/services");
  const services = await res.json();

  const paths = services?.map((service: IServices) => ({
    params: { id: service._id },
  }));
  return { paths, fallback: false };
};

//

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const res = await fetch(`http://localhost:5000/services/${params?.id}`);
  const service = await res.json();

  //projects
  const response = await fetch("http://localhost:5000/projects");
  const projects = await response.json();
  //   const singleProject = projects.map((project: IProjects) => project);

  //   console.log(projects);

  const filteredProjects = projects.filter(
    (project: IProjects) => project.category === service.category
  );
  console.log(filteredProjects.length);

  return { props: { service, projects: filteredProjects } };
};
