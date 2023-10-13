/* eslint-disable react/jsx-key */
import { ICategory } from "@/types/global";
import Image from "next/image";

import Slider from "react-slick";
//

interface IProps {
  categories: ICategory[];
}

const PaintCategories = ({ categories }: IProps) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <SampleNextArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-slate-200 mx-10">
      <Slider {...settings}>
        {categories.map((category: ICategory, i) => (
          <div key={i}>
            <Image
              className="item"
              src={category?.image}
              alt="img"
              width={100}
              height={100}
            />
            <h2>{category.name}</h2>
            <h2>{category.title}</h2>
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
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
