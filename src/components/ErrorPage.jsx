import React from "react";
import image from "../assets/404-drib23.gif";
const ErrorPage = () => {
  return (
    <img
      src={image}
      className="w-50 my-auto"
      alt=""
      style={{ objectFit: "contain", mixBlendMode: "darken" }}
    />
  );
};

export default ErrorPage;
