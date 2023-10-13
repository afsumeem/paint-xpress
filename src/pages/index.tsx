import RootLayout from "@/components/Layouts/RootLayout";
import AboutUs from "@/components/UI/AboutUs";
import ChooseUs from "@/components/UI/ChooseUs";
import HeroSection from "@/components/UI/HeroSection";
import LatestProjects from "@/components/UI/LatestProjects";
import PaintCategories from "@/components/UI/PaintCategories";
import { ICategory, IProjects } from "@/types/global";
import { GetStaticProps } from "next";
import Head from "next/head";

//

interface IProps {
  categories: ICategory[];
  projects: IProjects[];
}

export default function HomePage({ categories, projects }: IProps) {
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
  //fetch categories
  const res = await fetch("http://localhost:5000/categories");
  const categories = await res.json();

  //fetch latest projects
  const response = await fetch("http://localhost:5000/projects");
  const projects = await response.json();

  return {
    props: {
      categories,
      projects,
    },
    revalidate: 5,
  };
};
