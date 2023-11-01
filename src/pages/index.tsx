import RootLayout from "@/components/Layouts/RootLayout";
import AboutUs from "@/components/UI/AboutUs";
import ChooseUs from "@/components/UI/ChooseUs";
import CustomerReviews from "@/components/UI/CustomerReviews";
import Feedback from "@/components/UI/Feedback";
import HeroSection from "@/components/UI/HeroSection";
import HomeServices from "@/components/UI/HomeServices";
import LatestProjects from "@/components/UI/LatestProjects";
import PaintCategories from "@/components/UI/PaintCategories";
// import Feedback from "@/components/UI/feedback";
import {
  ICategory,
  ICustomerReviews,
  IProjects,
  IServices,
} from "@/types/global";
import { GetStaticProps } from "next";
import Head from "next/head";
import ScrollToTop from "react-scroll-to-top";
//

interface IProps {
  categories: ICategory[];
  projects: IProjects[];
  services: IServices[];
  reviews: ICustomerReviews[];
}

export default function HomePage({
  categories,
  projects,
  services,
  reviews,
}: IProps) {
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
      <CustomerReviews reviews={reviews} />
      <Feedback />
      <ScrollToTop
        smooth
        style={{ backgroundColor: "var(--blue)", padding: "5px" }}
        color="white"
      />
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

//fetch paints categories
export const getStaticProps: GetStaticProps<IProps> = async () => {
  //fetch services
  const result = await fetch("https://paintxpress-server.vercel.app/services");
  const services = await result.json();
  const randomServices = services.slice(0, 8);

  //fetch categories
  const res = await fetch("https://paintxpress-server.vercel.app/categories");
  const categories = await res.json();

  //fetch latest projects
  const response = await fetch(
    "https://paintxpress-server.vercel.app/projects"
  );
  const projects = await response.json();
  const randomProjects = projects.slice(0, 6);

  //customer reviews

  const reviews = await fetch("https://paintxpress-server.vercel.app/reviews");
  const customerReviews = await reviews.json();

  return {
    props: {
      categories: categories,
      projects: randomProjects,
      services: randomServices,
      reviews: customerReviews,
    },
    revalidate: 5,
  };
};
