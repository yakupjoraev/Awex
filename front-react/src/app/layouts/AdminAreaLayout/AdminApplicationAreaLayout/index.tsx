import React from "react";
import { Outlet } from "react-router-dom";

const AdminApplicationAreaLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminApplicationAreaLayout;
