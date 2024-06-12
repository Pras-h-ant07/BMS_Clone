import { Tabs } from "antd";
import TheatreListTable from "./TheatreListTable";
import BookingsListTable from "./BookingsListTable";

function UsersActions() {
  const items = [
    {
      key: "1",
      label: "Bookings",
      children: <BookingsListTable />,
    },
    {
      key: "2",
      label: "Theatres List",
      children: <TheatreListTable />,
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Action Panel: User</h1>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}

export default UsersActions;
