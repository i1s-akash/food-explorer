import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export const filterOptions = [
  { name: "Filter", icon: <CiFilter />, dropdown: true },
  { name: "Sort By", icon: <IoIosArrowDown />, dropdown: true },
  { name: "Fast Delivery", icon: <RxCross2 />, isChecked: false },
  { name: "New on Swiggy", icon: <RxCross2 />, isChecked: false },
  { name: "Ratings 4.0+", icon: <RxCross2 />, isChecked: false },
  { name: "Pure Veg", icon: <RxCross2 />, isChecked: false },
  { name: "Offers", icon: <RxCross2 />, isChecked: false },
  { name: "Rs.300 - Rs.600", icon: <RxCross2 />, isChecked: false },
  { name: "Less than Rs.300", icon: <RxCross2 />, isChecked: false },
];
