import LandingFooter from "@components/LandingFooter";
import LandingHeader from "@components/LandingHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const LandingLayout: React.FC = () => {
  return (
    <>
      <LandingHeader />
      <Outlet />
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
