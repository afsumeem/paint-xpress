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
    <div>
      <h3>Benefits</h3>
      <h1>Why Choose us</h1>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<BarsOutlined />}
        >
          <div className="flex justify-between">
            <div className="">
              {/* img */}

              <Image
                src={waterImg}
                alt="water proofing"
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="vertical-timeline-element-title">
                Water Proofing
              </h3>
            </div>
            <div className="">
              <Image
                src={fauxFinish}
                alt="water proofing"
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="vertical-timeline-element-title">Faux Finishes</h3>
            </div>
            <div className="">
              <Image
                src={prePaint}
                alt="water proofing"
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="vertical-timeline-element-title">
                Pre-Paint Demo
              </h3>
            </div>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<BarsOutlined />}
        >
          <div className="flex justify-between">
            <div className="">
              <Image
                src={qauality}
                alt="water proofing"
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="vertical-timeline-element-title">
                Quality Material
              </h3>
            </div>
            <div className="">
              <Image
                src={worker}
                alt="water proofing"
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="vertical-timeline-element-title">
                Trained Workers
              </h3>
            </div>
            <div className="">
              <Image
                src={response}
                alt="water proofing"
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="vertical-timeline-element-title">
                Quick Response
              </h3>
            </div>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default ChooseUs;
