import React from "react";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";

const Banner = () => {
  return (
    <div className="w-full h-full md:h-[100vh] pt-28 flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-white to-blue-50 shadow-xl overflow-hidden">
      <LeftBanner />
      <RightBanner />
    </div>
  );
};

export default Banner;
