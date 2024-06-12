import React from "react";
import { Tabs } from "antd";
import MoviesActionsTable from "./MoviesActionsTable";
import TheatresActionsTable from "./TheatresActionsTable";

function AdminActions() {
  const tabItems = [
    {
      key: 1,
      label: "Movie Actions",
      children: <MoviesActionsTable />,
    },
    {
      key: 2,
      label: "Theatre Actions",
      children: <TheatresActionsTable />,
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Action Panel: Admin</h1>
      <Tabs defaultActiveKey="1" items={tabItems}></Tabs>
    </div>
  );
}

export default AdminActions;
