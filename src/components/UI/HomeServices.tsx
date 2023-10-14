import { addToBookingList } from "@/redux/features/services/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IServices } from "@/types/global";
import { Button, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

//
interface IProps {
  services: IServices[];
}

const HomeServices = ({ services }: IProps) => {
  const dispatch = useAppDispatch();

  const [buttonClicked, setButtonClicked] = useState(false);

  // const handleAddToBookingList = (service: IServices) => {
  //   dispatch(addToBookingList(service));
  //   message.success("Service booked");
  // };

  const selectedService = useAppSelector((state) => state.bookingList.services);

  //

  const handleAddToBookingList = (service: IServices) => {
    // if (!buttonClicked) {
    dispatch(addToBookingList(service));
    message.success("Service booked");
    // setButtonClicked(true);
    // } else {
    //   message.warning("Service already booked");
    // }
  };

  return (
    <div>
      {services.map((service, i) => (
        <div key={i}>
          <h2>{service.title}</h2>
          <Link href={`/services/${service._id}`}>see details</Link>

          <Button
            onClick={() => handleAddToBookingList(service)}
            // disabled={buttonClicked}
          >
            book now
            {/* {buttonClicked ? "Booked" : "Book Now"} */}
          </Button>
        </div>
      ))}
      <Link href="/services">See all services</Link>
    </div>
  );
};

export default HomeServices;
