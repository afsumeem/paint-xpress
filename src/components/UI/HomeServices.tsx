/* eslint-disable @next/next/no-img-element */
import { addToBookingList } from "@/redux/features/services/serviceSlice";
import { PhoneOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IServices } from "@/types/global";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
//

interface IProps {
  services: IServices[];
}

const HomeServices = ({ services }: IProps) => {
  const dispatch = useAppDispatch();

  const [buttonClicked, setButtonClicked] = useState(false);

  // const handleAddToBookingList = (service: IServices) => {
  //   dispatch(addToBookingList(service));
  //   message.success("Service booked");
  // };

  const selectedService = useAppSelector((state) => state.bookingList.services);

  //

  const handleAddToBookingList = (service: IServices) => {
    // if (!buttonClicked) {
    dispatch(addToBookingList(service));
    message.success("Service booked");
    // setButtonClicked(true);
    // } else {
    //   message.warning("Service already booked");
    // }
  };

  //

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className=" py-20 px-10">
      <div className="mb-10 section-title">
        <h4 className="font-bold text-2xl text-sky-400 uppercase ">
          Our Services
        </h4>
        <h2 className="text-4xl font-semibold uppercase">
          We Provide Superior Paint Service
        </h2>
      </div>
      <Row gutter={20}>
        {services.map((service, i) => (
          // <div key={i}>
          <Col
            data-aos="zoom-in-up"
            data-aos-duration="1200"
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            key={i}
            className="section-card mb-10"
          >
            <div>
              <div className="bg-black overflow-hidden">
                <Link href={`/services/${service._id}`}>
                  <img
                    src={service?.image}
                    alt="service img"
                    // height={500}
                    // width={500}
                    className="w-full h-52 hover:opacity-70 transition hover:scale-125 duration-1000"
                  />
                </Link>
              </div>

              <div
                className="mx-2 p-6 -mt-6  shadow-xl h-90"
                style={{ background: "white", position: "sticky" }}
              >
                <Link href={`/services/${service._id}`}>
                  <h2 className="text-xl uppercase text-sky-500">
                    {service.title}
                  </h2>
                </Link>
                <hr />
                <p className="my-4 text-base">
                  {service.description}
                  <br />
                  <Link href={`/services/${service._id}`}>
                    <span className="underline">See details</span>
                  </Link>
                </p>
                <h3 className="text-xl mb-2 font-bold">$ {service.price}</h3>
                <p className="mb-4">
                  {" "}
                  <PhoneOutlined /> {service.contact}
                </p>
                <hr />

                <button
                  className="w-full bg-sky-200 font-bold hover:bg-sky-400 transition duration-700 uppercase py-2 rounded-md"
                  onClick={() => handleAddToBookingList(service)}
                  // disabled={buttonClicked}
                >
                  book now
                </button>
              </div>
            </div>
          </Col>
          // </div>
        ))}
        <Link href="/services">See all services</Link>
      </Row>
    </div>
  );
};

export default HomeServices;
