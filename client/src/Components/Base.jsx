import React from "react";
import Navbar from "./Navbar";

const Base = ({children}) => {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center   mx-4  ">

      {children}
      </div>
    </div>
  );
};

export default Base;
