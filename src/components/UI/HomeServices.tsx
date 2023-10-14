import { addToBookingList } from "@/redux/features/services/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IServices } from "@/types/global";
import { Button, message } from "antd";
import Link from "next/link";

//
interface IProps {
  services: IServices[];
}

const HomeServices = ({ services }: IProps) => {
  const dispatch = useAppDispatch();

  const handleAddToBookingList = (service: IServices) => {
    dispatch(addToBookingList(service));
    message.success("Service booked");
  };

  return (
    <div>
      {services.map((service, i) => (
        <div key={i}>
          <h2>{service.title}</h2>
          <Link href={`/services/${service._id}`}>see details</Link>

          <Button onClick={() => handleAddToBookingList(service)}>
            Book Now
          </Button>
        </div>
      ))}
      <Link href="/services">See all services</Link>
    </div>
  );
};

export default HomeServices;
