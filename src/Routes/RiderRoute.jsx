import React from "react";
import useRole from "../Hooks/useRole";

const RiderRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (role !== "rider") {
    return (
      <div className="text-5xl text-red-700 font-bold">Forbidden Access</div>
    );
  }
  return children;
};

export default RiderRoute;
