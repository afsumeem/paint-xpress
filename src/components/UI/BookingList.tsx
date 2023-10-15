/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Badge, Button, Drawer } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromBookingList } from "@/redux/features/services/serviceSlice";

const BookingList: React.FC = () => {
  const { services, total } = useAppSelector((state) => state.bookingList);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Badge count={services.length} size="small">
        <BookOutlined
          shape="square"
          sizes="large"
          onClick={showDrawer}
          className="text-blue-900 text-2xl "
        />
      </Badge>

      <Drawer
        title="Booking List"
        placement="right"
        onClose={onClose}
        open={open}
      >
        {services.length === 0 ? (
          <h2 className="text-red-500 text-xl">No service booked!!</h2>
        ) : (
          <>
            <div className="my-4">
              <h2 className="text-xl">Total Price: {total}</h2>
            </div>
            {services.map((service, i) => (
              <div key={i} className="border p-4 m-2">
                <div className="flex items-center gap-5">
                  <img
                    src={service.image}
                    style={{ height: "50px", width: "80px" }}
                    alt=""
                  />
                  <div>
                    <h2 className="text-base font-semibold my-2 uppercase">
                      {service.title}
                    </h2>
                    <h6>{service.category}</h6>
                    <h1 className="text-xl my-2">$ {service.price}</h1>
                  </div>
                </div>

                <Button
                  className="w-full"
                  danger
                  onClick={() => dispatch(removeFromBookingList(service))}
                >
                  Cancel booking
                </Button>
              </div>
            ))}
          </>
        )}
      </Drawer>
    </>
  );
};

export default BookingList;
