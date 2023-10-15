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
    <div className="mx-10">
      <div className="mb-10 section-title">
        <h4 className="font-bold text-2xl text-sky-400 uppercase ">
          Latest Projects
        </h4>
        <h2 className="text-4xl font-semibold uppercase font-mono">
          Inspiration on Your Next Project
        </h2>
      </div>
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
