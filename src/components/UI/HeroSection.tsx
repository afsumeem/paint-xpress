/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "antd";
import Image from "next/image";
import img1 from "@/assests/images/hero2.jpg";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <div className="banner overflow-hidden">
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
            opacity: "0.2",
          }}
        />
        <div className="banner-content text-center">
          <h5 className="text-lg md:text-2xl text-white">Best in country</h5>
          <h2 className="text-xl md:text-4xl uppercase font-bold my-8 text-white">
            Bring Your Home To Lively colors. Cost effective commercial service
          </h2>

          <Link href="/services">
            <button
              style={{ backgroundColor: "var(--blue)" }}
              className="px-4 py-2 md:px-6 md:py-4 uppercase mt-6 text-white font-bold "
            >
              Booking Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
