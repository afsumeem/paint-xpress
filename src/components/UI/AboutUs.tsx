import Image from "next/image";
import aboutImg from "@/assests/images/about.jpg";
import AOS from "aos";
import { useEffect } from "react";
import Link from "next/link";

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="px-10 pb-28">
      <div className="mb-10 section-title">
        <h4
          className="font-bold uppercase "
          style={{ color: "var(--blue)", fontSize: "var(--font)" }}
        >
          Who we are
        </h4>
        <h2
          style={{ fontSize: "var(--titleFont)" }}
          className="font-mono font-semibold uppercase"
        >
          Leading Painting Service Agency
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-5  justify-center">
        <div
          data-aos="fade-right"
          data-aos-duration="1200"
          className="min-h-96 w-full lg:w-1/2 border rounded"
        >
          <Image
            src={aboutImg}
            alt="about us image"
            className="w-full h-full rounded"
          />
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          className="min-h-96 w-full lg:w-1/2 border rounded  lg:-ml-24 lg:mt-10 -mb-14 bg-white shadow-2xl"
        >
          <div className="p-10  ">
            <h4
              style={{ color: "var(--blue)" }}
              className=" uppercase text-md font-bold"
            >
              About Us
            </h4>
            <h2 className="text-xl font-semibold font-mono uppercase mb-8">
              Bringing your dreams to life
            </h2>

            <p className="mb-8 text-justify">
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
            <Link href="/services">
              <button
                style={{ backgroundColor: "var(--blue)" }}
                className="px-6 py-2  uppercase mt-6 text-white font-bold"
              >
                Booking Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
