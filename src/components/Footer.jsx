import React from "react";
import swiggyLogo from "../../public/images/swiggy-logo.png";

const Footer = () => {
  return (
    <footer className="px-4 md:px-20 py-6 lg:py-10 bg-black text-white">
      <div className="flex items-center py-2 cursor-pointer">
        <img src={swiggyLogo} alt="swiggy-logo" className="w-7 h-7" />
        <span className="text-lg md:text-xl lg:text-2xl font-bold ml-2">Swiggy</span>
      </div>
      <span className="text-sm md:text-base lg:text-lg text-gray-500">&#169; 2023 Bundl Technologies Pvt. Ltd</span>
    </footer>
  );
};

export default Footer;

// This is the Footer Component with basic data.
