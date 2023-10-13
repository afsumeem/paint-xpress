import Image from "next/image";
import aboutImg from "../../assests/images/about.jpg";

const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 my-10 p-10">
      <div className="min-h-96 w-full lg:w-1/2 border rounded-3xl">
        <Image
          src={aboutImg}
          alt="about us image"
          className="w-full h-full rounded-3xl"
        />
      </div>
      <div className="min-h-96 w-full lg:w-1/2 border rounded-3xl lg:-ml-14 lg:mt-14 -mb-14 bg-white">
        <h4>About Us</h4>
        <h2>Who We Are</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid
          consectetur enim totam omnis! Quaerat soluta dolores dolor deleniti
          atque eligendi voluptatum vero! Quasi, dolorum. Quos quo facilis
          incidunt architecto. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Sit aliquid consectetur enim totam omnis! Quaerat
          soluta dolores dolor deleniti atque eligendi voluptatum vero! Quasi,
          dolorum. Quos quo facilis incidunt architecto.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
