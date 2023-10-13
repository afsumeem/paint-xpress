import { IServices } from "@/types/global";
import Link from "next/link";

//
interface IProps {
  services: IServices[];
}

const HomeServices = ({ services }: IProps) => {
  console.log(services.length);
  return (
    <div>
      {services.map((service, i) => (
        <div key={i}>
          <h2>{service.title}</h2>
          <Link href={`/services/${service._id}`}>see details</Link>
        </div>
      ))}
    </div>
  );
};

export default HomeServices;
