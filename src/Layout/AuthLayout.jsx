import React from "react";
import Logo from "../Components/Logo/Logo.jsx";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className=" ">
      <div className="flex justify-center items-center">
        <div className="flex-1 h-screen">
          <div className="ml-14">
            <Logo></Logo>
          </div>
          <div className="flex items-center h-full">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="flex-1 bg-base-200 h-screen">
          <div className="flex items-center h-full">
            <img src={authImg} alt="" className="mx-auto " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
