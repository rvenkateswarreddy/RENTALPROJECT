import React from "react";
import { Outlet } from "react-router-dom";

import Menubar from "./Menubar";

const SellerDashboard = () => {
  return (
    <>
      <Menubar />
      <Outlet />
    </>
  );
};

export default SellerDashboard;
