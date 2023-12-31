import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BarsOutlined } from "@ant-design/icons";
import Image from "next/image";
import waterImg from "@/assests/images/water.jpg";
import fauxFinish from "@/assests/images/faux.png";
import prePaint from "@/assests/images/prepaint.png";
import response from "@/assests/images/response.png";
import qauality from "@/assests/images/quality.jpg";
import worker from "@/assests/images/images.png";

const ChooseUs = () => {
  return (
    <div className="bg-slate-100">
      <div className="px-10 pt-10">
        <div className="mb-6">
          <h4
            className="font-bold uppercase"
            style={{ color: "var(--blue)", fontSize: "var(--font)" }}
          >
            Benefits
          </h4>
          <h2
            className=" font-mono font-semibold uppercase text-xl md:text-3xl"
            // style={{ fontSize: "var(--titleFont)" }}
          >
            Why Choose us
          </h2>
        </div>

        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work "
            style={{ marginBottom: 0 }}
            contentStyle={{
              border: "1px dashed #F7F7F7",
              color: "#fff",
            }}
            contentArrowStyle={{ borderRight: "7px solid  gray" }}
            iconStyle={{
              background: "var(--blue)",
              height: "35px",
              width: "35px",
              marginLeft: "-20px",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="border m-4 py-4 px-8 transition duration-700  ">
                {/* img */}

                <Image
                  src={waterImg}
                  alt="water proofing"
                  height={100}
                  width={100}
                  // className="rounded-full"
                />
                <h3 className="vertical-timeline-element-title text-black">
                  Water Proofing
                </h3>
              </div>
              <div className="border m-4 py-4 px-8 transition duration-700">
                <Image
                  src={fauxFinish}
                  alt="water proofing"
                  height={100}
                  width={100}
                  // className="rounded-full"
                />
                <h3 className="vertical-timeline-element-title text-black">
                  Faux Finishes
                </h3>
              </div>
              <div className="border m-4 py-4 px-8 transition duration-700">
                <Image
                  src={prePaint}
                  alt="water proofing"
                  height={100}
                  width={100}
                  // className="rounded-full"
                />
                <h3 className="vertical-timeline-element-title text-black">
                  Pre-Paint Demo
                </h3>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            style={{ marginTop: 0 }}
            className="vertical-timeline-element--work "
            iconStyle={{
              background: "var(--blue)",
              height: "35px",
              width: "35px",
              marginLeft: "-20px",
            }}
            contentArrowStyle={{ borderRight: "7px solid  gray" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="border m-4 py-4 px-8 transition duration-700  ">
                <Image
                  src={qauality}
                  alt="water proofing"
                  height={100}
                  width={100}
                />
                <h3 className="vertical-timeline-element-title">
                  Quality Material
                </h3>
              </div>
              <div className="border m-4 py-4 px-8 transition duration-700  ">
                <Image
                  src={worker}
                  alt="water proofing"
                  height={100}
                  width={100}
                />
                <h3 className="vertical-timeline-element-title">
                  Trained Workers
                </h3>
              </div>
              <div className="border m-4 py-4 px-8 transition duration-700  ">
                <Image
                  src={response}
                  alt="water proofing"
                  height={100}
                  width={100}
                />
                <h3 className="vertical-timeline-element-title">
                  Quick Response
                </h3>
              </div>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default ChooseUs;
