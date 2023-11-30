import React from "react";
import AdminApplicationAreaNavbar from "./AdminApplicationAreaNavbar";
import { Outlet } from "react-router-dom";

const AdminApplicationAreaLayout: React.FC = () => {
  return (
    <>
      <AdminApplicationAreaNavbar />
      <Outlet />
    </>
  );
};

export default AdminApplicationAreaLayout;
