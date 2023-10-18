/* eslint-disable @next/next/no-img-element */

import AdminDashboardLayout from "@/components/Layouts/AdminDashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import usePrivateRoute from "@/privateRoute/layout";
import { useGetUsersQuery } from "@/redux/features/users/usersApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IServices, IUsers } from "@/types/global";
import { Space, Spin, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetStaticProps } from "next";

interface IProps {
  services: IServices[];
}

//
const ServiceManagement = ({ services }: IProps) => {
  const handleDeleteItem = (id: any) => {
    const filteredService = services.filter((service) => service._id !== id);

    message.success("item deleted");
  };

  //
  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" />;
  }

  interface DataType {
    key: string;
    title: string;
    category: string;
  }

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleDeleteItem(record._id)}>
            <a style={{ color: "green" }}>Delete</a>
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {services.length === 0 ? (
        <h2 className="text-red-500 text-xl">No Services</h2>
      ) : (
        <>
          <div>
            <h3 className="text-3xl text-center mb-6">Manage Services</h3>
            <hr className="mb-4" />
          </div>
          <Table columns={columns} dataSource={services} />
        </>
      )}
    </div>
  );
};

export default ServiceManagement;

ServiceManagement.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const res = await fetch("https://paintxpress-server.vercel.app/services");
  const services = await res.json();
  console.log(services);
  return {
    props: {
      services: services,
    },
    revalidate: 5,
  };
};
