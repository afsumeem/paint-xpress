/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/components/Layouts/Dashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import { removeFromBookingList } from "@/redux/features/services/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";

const BookingStatusPage = () => {
  const { services } = useAppSelector((state) => state.bookingList);
  const dispatch = useAppDispatch();

  const handleDeleteItem = (id: any) => {
    dispatch(removeFromBookingList(id));
    message.success("item deleted");
  };

  interface DataType {
    key: string;
    title: string;
    price: number;
    category: string;
    rating: number;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: "green" }}>Pending</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {services.length === 0 ? (
        <h2 className="text-red-500 text-xl">Your cart is currently empty.</h2>
      ) : (
        <>
          <div>
            <h3 className="text-3xl text-center mb-6">Booking History</h3>
            <hr className="mb-4" />
          </div>
          <Table columns={columns} dataSource={services} />
        </>
      )}
    </div>
  );
};

export default BookingStatusPage;

BookingStatusPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
