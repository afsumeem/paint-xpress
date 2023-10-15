import RootLayout from "@/components/Layouts/RootLayout";
import AboutUs from "@/components/UI/AboutUs";
import ChooseUs from "@/components/UI/ChooseUs";
import HeroSection from "@/components/UI/HeroSection";
import HomeServices from "@/components/UI/HomeServices";
import LatestProjects from "@/components/UI/LatestProjects";
import PaintCategories from "@/components/UI/PaintCategories";
import { ICategory, IProjects, IServices } from "@/types/global";
import { GetStaticProps } from "next";
import Head from "next/head";

//

interface IProps {
  categories: ICategory[];
  projects: IProjects[];
  services: IServices[];
}

export default function HomePage({ categories, projects, services }: IProps) {
  return (
    <>
      <Head>
        <title>PaintXpress</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <HomeServices services={services} />
      <AboutUs />
      <PaintCategories categories={categories} />
      <LatestProjects projects={projects} />
      <ChooseUs />
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

//fetch paints categories
export const getStaticProps: GetStaticProps<IProps> = async () => {
  //fetch services
  const result = await fetch("http://localhost:5000/services");
  const services = await result.json();
  const randomServices = services.slice(0, 8);

  //fetch categories
  const res = await fetch("http://localhost:5000/categories");
  const categories = await res.json();

  //fetch latest projects
  const response = await fetch("http://localhost:5000/projects");
  const projects = await response.json();
  const randomProjects = projects.slice(0, 6);

  return {
    props: {
      categories: categories,
      projects: randomProjects,
      services: randomServices,
    },
    revalidate: 5,
  };
};
