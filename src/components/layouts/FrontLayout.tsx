import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HeaderFront from "../headers/HeaderFront";
const FrontLayout = () => {
  return (
    <Fragment>
      <HeaderFront />
      <main className="pt-[100px] w-full h-screen top-0 overflow-y-scroll text-white z-0">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default FrontLayout;
