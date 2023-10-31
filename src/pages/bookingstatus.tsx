/* eslint-disable @next/next/no-img-element */
import DashboardLayout from "@/components/Layouts/Dashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import usePrivateRoute from "@/privateRoute/layout";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IServices } from "@/types/global";
import { Breadcrumb, Space, Spin, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";

const BookingStatusPage = () => {
  const { services } = useAppSelector((state) => state.bookingList);

  //

  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" className="text-center" />;
  }

  interface DataType {
    key: string;
    title: string;
    price: number;
    category: string;
    rating: number;
  }

  //
  interface DataType extends IServices {}

  const columns: ColumnsType<IServices> = [
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
      <Breadcrumb style={{}}>
        <Breadcrumb.Item>Booking History</Breadcrumb.Item>
        <Breadcrumb.Item>Booking Status</Breadcrumb.Item>
      </Breadcrumb>
      <h3
        className="text-3xl font-bold text-center my-4"
        style={{ color: "var(--blue)", fontSize: "var(--font)" }}
      >
        Booking History
      </h3>
      <hr className="mb-4" />
      {services.length === 0 ? (
        <h2 className="text-red-500 text-xl">Your cart is currently empty.</h2>
      ) : (
        <>
          <div></div>
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
