import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import swiggyLogo from "../../public/images/swiggy-logo.png";

const Header = () => {
  return (
    <nav className="px-4 sm:px-20 py-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-200">
      <div className="flex items-center cursor-pointer">
        <img src={swiggyLogo} alt="swiggy-logo" className="w-7 h-7" />
        <span className="text-lg font-bold text-orange-500">Swiggy</span>
      </div>

      <div className="relative w-full sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md mt-4 sm:mt-0">
        <input
          type="text"
          placeholder="Search for restaurant and food"
          className="w-full px-4 py-2 pr-10 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <MdOutlineSearch className="h-6 w-6 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Header;

// This is Header Component, As mentioned to show logo and search bar.
// Note: I have used react-icons library to work with icons in the app.
