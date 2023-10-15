import Image from "next/image";
import aboutImg from "../../assests/images/about.jpg";
import AOS from "aos";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="px-10 pb-28">
      <div className="mb-10 section-title">
        <h4 className="font-bold text-2xl text-sky-400 uppercase ">
          Who we are
        </h4>
        <h2 className="text-4xl font-mono font-semibold uppercase">
          Leading Painting Service Agency
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-5  justify-center">
        <div
          data-aos="fade-right"
          data-aos-duration="1200"
          className="min-h-96 w-full lg:w-1/2 border rounded-3xl"
        >
          <Image
            src={aboutImg}
            alt="about us image"
            className="w-full h-full rounded-3xl"
          />
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          className="min-h-96 w-full lg:w-1/2 border rounded-3xl lg:-ml-24 lg:mt-14 -mb-14 bg-white shadow-2xl"
        >
          <div className="p-10  ">
            <h4 className="text-sky-600 uppercase text-md font-bold">
              About Us
            </h4>
            <h2 className="text-xl font-semibold font-mono uppercase mb-8">
              Bringing your dreams to life
            </h2>

            <p className="mb-8 ">
              PaintXpress will provide top-quality interior and exterior
              residential and commercial painting services. The principal
              officers of Barnum Painters believe that most companies in this
              industry suffer two major problems. These are poor scheduling of
              job projects and poor retention of quality employees. Both lead to
              lower customer satisfaction, lack of repeat business and a low
              word-of-mouth referral rate.
            </p>
            <hr />
            <div className="mt-4 font-semibold">
              <h5 className="">MON - FRI: 9 AM - 10 PM</h5>
              <h5>SATURDAY: 9 AM - 6 PM</h5>
            </div>
            <button className="px-6 py-2 bg-sky-600 uppercase mt-6 text-white font-bold">
              Our Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
