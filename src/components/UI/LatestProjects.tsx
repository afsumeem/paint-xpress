import { IProjects } from "@/types/global";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//
interface IProps {
  projects: IProjects[];
}

const LatestProjects = ({ projects }: IProps) => {
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

      <Link href="/projects">
        <Button>See All Projects</Button>
      </Link>
    </div>
  );
};

export default LatestProjects;
