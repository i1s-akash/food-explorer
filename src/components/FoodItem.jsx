import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";

const FoodItem = ({ meals, showItemDetails }) => {
  const [pagNum, setPagNum] = useState(0);
  const pagin = (par) => {
    if (par === "next") {
      setPagNum((pagNum) => ++pagNum);
    } else {
      setPagNum((pagNum) => --pagNum);
    }
  };

  return (
    <div
      className="px-4 md:px-20 pb-4 max-h-screen overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals.length > 0 &&
          meals.map(({ idMeal, strMeal, strMealThumb }) => (
            <div
              key={idMeal}
              className="hover:scale-95 transition-transform cursor-pointer"
              onClick={() => showItemDetails(idMeal)}
            >
              <img
                src={strMealThumb}
                alt={strMeal}
                className="rounded-lg object-cover mb-1"
              />
              <div className="text-lg font-semibold px-4">{strMeal}</div>
              <div className="flex items-center px-4">
                <div className="flex items-center">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-1 flex items-center justify-center text-white">
                    <FaRegStar />
                  </div>
                  <span className="text-sm font-semibold">{`${Math.floor(
                    Math.random() * 6
                  )}.00`}</span>
                </div>
                <div className="ml-2 text-sm font-semibold">
                  &#8226; {`${Math.floor(Math.random() * 20)} - 25 mins`}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => pagin("prev")}
          disabled={pagNum === 0}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            pagNum === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          &lt; Previous
        </button>
        <button
          onClick={() => pagin("next")}
          disabled={pagNum === 10}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            pagNum === 10 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default FoodItem;

// This is the component to show case Meal/Item Cards.
// Note: Implemented pagianation, however I didn't get any pagination through api. The reason I have conditioned it according to me.
