/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "antd";
import Image from "next/image";
import img1 from "../../assests/images/about.jpg";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <div className="banner">
      <div className="bg-black">
        <Image
          src={img1}
          // height={500}
          // width={500}
          className="bannerImg "
          alt="carousel img"
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "100vh",
            opacity: "0.4",
          }}
        />
        <div className="banner-content text-center">
          <h5 className="text-2xl text-sky-100">Best in country</h5>
          <h2 className="text-4xl uppercase font-bold my-8 text-white">
            Bring Your Home To Lively colors. Cost effective commercial service
          </h2>

          <Link href="/services">
            <button className="px-6 py-4 bg-sky-600 uppercase mt-6 text-white font-bold">
              Booking Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
