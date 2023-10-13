import RootLayout from "@/components/Layouts/RootLayout";
import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";
import { IProjects } from "@/types/global";
import Image from "next/image";
import React, { useState } from "react";

//

interface IProps {
  projects: IProjects[];
  categories: string[];
}

const Projects = ({ projects, categories }: IProps) => {
  //search and filter functionality for books

  const [selectCategory, setSelectCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useGetProjectsQuery({
    search: searchText,
    category: selectCategory,
  });

  return (
    <div>
      <h5>What We Do</h5>
      <h1>Latest Projects</h1>

      <form className="join mx-auto w-2/3">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered join-item w-full md:w-2/3 md:mx-auto"
          placeholder="Search here"
        />
      </form>

      {/*  */}
      <button
        onClick={() => {
          setSelectCategory("");
        }}
        className="btn w-full rounded-none text-blue-950 hover:text-white  bg-slate-400 hover:bg-blue-950 transition duration-1000"
      >
        Reset category
      </button>
      {categories?.map((category, i) => (
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
      ))}

      {/*  */}
      {data?.length === 0 ? (
        <h2>Data not found</h2>
      ) : (
        <>
          {isLoading ? (
            <h2>loading</h2>
          ) : (
            <>
              {data?.map((project: IProjects, i: number) => (
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
            </>
          )}
        </>
      )}
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
