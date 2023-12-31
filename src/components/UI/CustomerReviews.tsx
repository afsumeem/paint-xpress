/* eslint-disable @next/next/no-img-element */
import { ICustomerReviews } from "@/types/global";
import Slider from "react-slick";
//@ts-ignore
import ReactStars from "react-rating-stars-component";

interface IProps {
  reviews: ICustomerReviews[];
}

const CustomerReviews = ({ reviews }: IProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: (
      <SampleNextArrow style={{}} onClick={undefined} className={undefined} />
    ),
    prevArrow: (
      <SamplePrevArrow className={undefined} style={{}} onClick={undefined} />
    ),
  };
  return (
    <div className=" pt-20 pb-10 px-10">
      <div className="mb-10 section-title">
        <h4
          className="font-bold uppercase"
          style={{ color: "var(--blue)", fontSize: "var(--font)" }}
        >
          Reviews
        </h4>
        <h2
          className=" font-mono font-semibold uppercase text-xl md:text-3xl"
          // style={{ fontSize: "var(--titleFont)" }}
        >
          What our Customer Says
        </h2>
      </div>
      <div className="m-0 md:m-10">
        <Slider {...settings} className="mx-2 md:mx-20 p-2 ">
          {reviews.map((review: ICustomerReviews, i) => (
            <div
              key={i}
              className="border border-dashed p-2 md:p-10 bg-slate-50"
            >
              <div className="flex flex-col items-center justify-center hover:cursor-pointer">
                <img className="item h-20 w-20" src={review?.img} alt="img" />
                <h2
                  className="uppercase mt-4 font-bold"
                  style={{ color: "var(--blue)", fontSize: "var(--font)" }}
                >
                  {review.name}
                </h2>
                <h2 className="font-mono text-md">{review.designation}</h2>
                <p className="my-4">{review.comment}</p>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  edit={false}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomerReviews;

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
