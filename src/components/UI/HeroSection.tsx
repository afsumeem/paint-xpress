import React from "react";
import { Button, Carousel } from "antd";
import Image from "next/image";
import img1 from "../../assests/images/about.jpg";

const contentStyle: React.CSSProperties = {
  // height: "160px",
  // color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  // background: "black",
  // minHeight: "100vh",
};

const HeroSection: React.FC = () => (
  <div className="banner">
    <Carousel autoplay style={{ background: "black" }}>
      <div>
        <Image
          src={img1}
          className="bannerImg"
          alt="carousel img"
          style={{
            background: "black",
            width: "100%",
            height: "100vh",
            opacity: "0.4",
          }}
        />
        <div className="banner-content">
          <h5 className="text-2xl">Best in country</h5>
          <h2 className="text-4xl">Cost effective commercial service</h2>
          <p className="text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
            alias necessitatibus? Dolore blanditiis adipisci minus tempora
            corrupti accusantium veniam amet, error deserunt voluptatibus
            consequuntur ipsam velit et tenetur laudantium! Sunt!
          </p>
          <Button>Booking Now</Button>
        </div>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </div>
);

export default HeroSection;
