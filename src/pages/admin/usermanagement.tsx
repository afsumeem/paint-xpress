/* eslint-disable @next/next/no-img-element */

import AdminDashboardLayout from "@/components/Layouts/AdminDashboard";
import RootLayout from "@/components/Layouts/RootLayout";
import usePrivateRoute from "@/privateRoute/layout";
import { IUsers } from "@/types/global";
import { Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetStaticProps } from "next";

interface IProps {
  users: IUsers[];
}

//
const UserManagementPage = ({ users }: IProps) => {
  interface DataType {
    key: string;
    email: string;
  }

  //
  const loading = usePrivateRoute();

  if (loading) {
    return <Spin size="large" />;
  }

  interface DataType extends IUsers {}

  const columns: ColumnsType<IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: "green" }}>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {users.length === 0 ? (
        <h2 className="text-red-500 text-xl">No users</h2>
      ) : (
        <>
          <div>
            <h3 className="text-3xl text-center mb-6">Registered Users</h3>
            <hr className="mb-4" />
          </div>
          <Table columns={columns} dataSource={users} />
        </>
      )}
    </div>
  );
};

export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const res = await fetch("https://paintxpress-server.vercel.app/users");
  const users = await res.json();

  return {
    props: {
      users: users,
    },
    revalidate: 5,
  };
};
