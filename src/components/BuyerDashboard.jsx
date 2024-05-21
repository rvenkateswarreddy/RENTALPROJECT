import React from "react";
import { Outlet } from "react-router-dom";

import Menubar from "./Menubar";

const BuyerDashboard = () => {
  return (
    <>
      <Menubar />
      <Outlet />
    </>
  );
};

export default BuyerDashboard;
