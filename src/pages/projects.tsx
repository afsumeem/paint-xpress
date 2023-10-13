import RootLayout from "@/components/Layouts/RootLayout";
import { IProjects } from "@/types/global";
import Image from "next/image";
import React from "react";

//

interface IProps {
  projects: IProjects[];
}

const Projects = ({ projects }: IProps) => {
  return (
    <div>
      <h5>What We Do</h5>
      <h1>Latest Projects</h1>
      {projects.map((project, i) => (
        <div key={i}>
          <h2>{project.name}</h2>
          <Image
            src={project.image}
            alt="latest projects image"
            width={300}
            height={300}
          />
          <div>
            {project.tags.map((tag, i) => (
              <div key={i}>
                <h3>{tag}</h3>
              </div>
            ))}
          </div>
          <h5>{project.duration}</h5>
          <p>{project.description}</p>
        </div>
      ))}
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

  return {
    props: {
      projects,
    },
    revalidate: 5,
  };
};
