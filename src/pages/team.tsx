/* eslint-disable @next/next/no-img-element */
import RootLayout from "@/components/Layouts/RootLayout";
import { ITeams } from "@/types/global";
import { Col, Row } from "antd";
import { GetStaticProps } from "next";
import styles from "@/styles/Team.module.css";
import {
  BehanceOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

interface IProps {
  teams: ITeams[];
}

const OurTeam = ({ teams }: IProps) => {
  return (
    <div className="mt-10 ">
      <div className="mb-10 section-title mx-10">
        <h4 className="font-bold text-md text-sky-400 uppercase ">
          Expert Team
        </h4>
        <h2 className="text-2xl font-semibold uppercase font-mono mb-6">
          Trained PaintXpress Team
        </h2>
        <hr />
      </div>
      <Row gutter={20}>
        {teams.map((team, i) => (
          <Col key={i} sm={24} md={12} lg={8}>
            <div className={styles.teamCard}>
              <div className={styles.coverBox}>
                <div className={styles.teamCover}>
                  <img src={team.image} alt="" />
                </div>
              </div>
              <div className={styles.teamDetails}>
                <h2 className="uppercase">{team.name}</h2>
                <h4>{team.designation}</h4>
              </div>
              <div className={styles.boxLine}></div>
              <div className={styles.boxLine}></div>

              <div className={styles.teamIcon}>
                <FacebookOutlined style={{ color: "blue", fontSize: "20px" }} />
                <TwitterOutlined
                  style={{ color: "skyblue", fontSize: "20px" }}
                />
                <InstagramOutlined style={{ color: "red", fontSize: "20px" }} />
                {/* {team?.social_links?.facebook}
                {team?.social_links?.twitter}
                {team?.social_links?.instagram}
                {team?.social_links?.behance} */}
                <BehanceOutlined
                  style={{ color: "rgb(35, 74, 184)", fontSize: "20px" }}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OurTeam;

OurTeam.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

//fetch paints categories
export const getStaticProps: GetStaticProps<IProps> = async () => {
  //customer reviews

  const res = await fetch("https://paintxpress-server.vercel.app/teams");
  const teams = await res.json();

  return {
    props: {
      teams: teams,
    },
    revalidate: 5,
  };
};
