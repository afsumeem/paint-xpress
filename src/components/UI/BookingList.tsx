import React, { useState } from "react";
import { Badge, Button, Drawer } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromBookingList } from "@/redux/features/services/serviceSlice";

const BookingList: React.FC = () => {
  const { services } = useAppSelector((state) => state.bookingList);
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
        <BookOutlined shape="square" sizes="large" onClick={showDrawer} />
      </Badge>

      <Drawer
        title="Booking list"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div>
          <h2>Total Price: </h2>
        </div>
        {services.length === 0 ? (
          <h2>no service booked</h2>
        ) : (
          <>
            {services.map((service, i) => (
              <div key={i} className="border p-4 m-2">
                <h2>{service.title}</h2>
                <h1>{service.price}</h1>
                <Button
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
