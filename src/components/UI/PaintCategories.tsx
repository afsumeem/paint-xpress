/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { ICategory } from "@/types/global";

import Slider from "react-slick";
//

interface IProps {
  categories: ICategory[];
}

const PaintCategories = ({ categories }: IProps) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    cssEase: "linear",
    nextArrow: (
      <SampleNextArrow style={{}} onClick={undefined} className={undefined} />
    ),
    prevArrow: (
      <SamplePrevArrow className={undefined} style={{}} onClick={undefined} />
    ),
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className=" m-10 ">
      <Slider {...settings} className="mx-20 px-6 ">
        {categories.map((category: ICategory, i) => (
          <div key={i} className="border border-dashed p-10 ">
            <div className="flex flex-col items-center justify-center hover:cursor-pointer">
              <img className="item h-32 w-32" src={category?.image} alt="img" />
              <h2 className="text-xl uppercase mt-4 text-red-500 font-bold">
                {category.name}
              </h2>
              <h2 className="font-mono text-md">{category.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PaintCategories;

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
      }}
      onClick={onClick}
    />
  );
}
