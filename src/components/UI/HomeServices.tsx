/* eslint-disable @next/next/no-img-element */
import { addToBookingList } from "@/redux/features/services/serviceSlice";
import { PhoneOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IServices } from "@/types/global";
import { Col, Pagination, Row, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import Image from "next/image";
//

interface IProps {
  services: IServices[];
}

const HomeServices = ({ services }: IProps) => {
  const dispatch = useAppDispatch();

  //

  const handleAddToBookingList = (service: IServices) => {
    dispatch(addToBookingList(service));
    message.success("Service booked");
  };

  //

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const displayServices = services.slice(startIndex, endIndex);

  //

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className=" pt-10 md:pt-20 pb-10 px-10">
      <div className="mb-10 section-title">
        <h4
          className="font-bold uppercase "
          style={{ color: "var(--blue)", fontSize: "var(--font)" }}
        >
          Our Services
        </h4>
        <h2
          // style={{ fontSize: "var(--titleFont)" }}
          className=" font-mono font-semibold uppercase text-xl md:text-3xl"
        >
          We Provide Superior Paint Service
        </h2>
      </div>
      <Row gutter={20}>
        {displayServices.map((service, i) => (
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
            className="section-card mb-10 "
          >
            <div>
              <div className="bg-black overflow-hidden">
                <Link href={`/services/${service._id}`}>
                  <Image
                    src={service?.image}
                    alt="service img"
                    height={500}
                    width={500}
                    className="w-full md:h-56 2xl:h-96 hover:opacity-70 transition hover:scale-125 duration-1000"
                  />
                </Link>
              </div>

              <div
                className="mx-2 p-6 -mt-6 shadow-xl flex flex-col justify-between h-96"
                style={{
                  background: "white",
                  position: "sticky",
                  // minHeight: "340px",
                }}
              >
                <div>
                  <Link href={`/services/${service._id}`}>
                    <h2
                      className=" uppercase"
                      style={{ color: "var(--blue)", fontSize: "var(--font)" }}
                    >
                      {service.title}
                    </h2>
                  </Link>
                  <hr />
                  <p className="my-4 text-base">
                    {service.description.slice(0, 60)}
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
                </div>
                <hr />

                <button
                  style={{ backgroundColor: "var(--blue)" }}
                  className="w-full font-bold text-white  transition duration-700 uppercase py-2 "
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
      </Row>
      <Pagination
        current={currentPage}
        total={services.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
      <Link href="/services ">
        <button
          style={{ backgroundColor: "var(--blue)" }}
          className="px-6 py-2 uppercase mt-6 text-white font-bold block m-auto mb-4"
        >
          See all services
        </button>
      </Link>
    </div>
  );
};

export default HomeServices;
