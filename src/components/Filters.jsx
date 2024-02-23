import React, { useState, useEffect, useRef, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import { filterOptions } from "../utils/constants";
import { fetchArea } from "../redux/slices";
import { connect } from "react-redux";

const Filters = ({
  actualArea,
  setActualArea,
  actualSortBy,
  setActualSortBy,
  fetchArea,
  fetch_area,
}) => {
  const filterRef = useRef(null);
  const modalRef = useRef(null);

  const [filters, setFilters] = useState(filterOptions);
  const [showModal, setShowModal] = useState("");
  const [area, setArea] = useState("Indian");
  const [sortBy, setSortBy] = useState("Relevance");

  const handleFilterTag = useCallback((index) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter, i) =>
        i === index ? { ...filter, isChecked: !filter.isChecked } : filter
      )
    );
  }, []);

  const toggleIt = useCallback((param) => {
    setShowModal(param);
  }, []);

  const clearFilter = useCallback(() => {
    setArea("Indian");
    setActualArea("Indian");
    setShowModal("");
  }, []);

  const handleSortChange = useCallback((sortOption) => {
    setSortBy(sortOption);
  }, []);

  const applyFilter = useCallback(() => {
    setActualArea(area);
    setActualSortBy(sortBy === "Relevance" ? "" : sortBy);
    setShowModal("");
  }, [area, sortBy]);

  useEffect(() => {
    showModal === "Filter" && !fetch_area.length && fetchArea();
  }, [showModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (filterRef.current && !filterRef.current.contains(event.target)) ||
        (modalRef.current && !modalRef.current.contains(event.target))
      ) {
        setShowModal("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 sm:px-20 py-4">
      <h2 className="text-2xl font-bold mb-6">{actualArea} Meals</h2>
      <div className="flex flex-wrap">
        {filters.map((filter, index) => (
          <div key={index} className="mr-4 mb-6">
            {typeof filter === "object" && filter.dropdown ? (
              <div className="relative inline-block">
                <button
                  onClick={() => toggleIt(filter.name)}
                  className="flex items-center rounded-full px-3 py-2 border border-gray-300 shadow-sm"
                >
                  <span className="text-sm">
                    {filter.name === "Sort By" && sortBy === "A-Z"
                      ? "A-Z"
                      : filter.name}
                  </span>
                  <span className="ml-1">{filter.icon}</span>
                </button>
                {showModal === filter.name && showModal === "Sort By" && (
                  <div
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-40"
                    style={{ top: "-0.1rem" }}
                    ref={filterRef}
                  >
                    <ul className="p-4">
                      <li className="py-3">
                        <label className="flex items-center justify-between cursor-pointer text-gray-500">
                          <span>Relevance (Default)</span>
                          <input
                            type="radio"
                            className="ml-2"
                            value="Relevance"
                            checked={sortBy === "Relevance"}
                            onChange={() => handleSortChange("Relevance")}
                          />
                        </label>
                      </li>
                      <li className="py-3">
                        <label className="flex items-center justify-between cursor-pointer text-gray-500">
                          <span>A - Z</span>
                          <input
                            type="radio"
                            className="ml-2"
                            value="A-Z"
                            checked={sortBy === "A-Z"}
                            onChange={() => handleSortChange("A-Z")}
                          />
                        </label>
                      </li>
                    </ul>
                    <hr className="my-0 w-full border-t border-gray-300" />
                    <button
                      className="text-orange-600 p-3"
                      onClick={applyFilter}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleFilterTag(index)}
                className={`flex items-center rounded-full px-3 py-2 border border-gray-300 shadow-sm ${
                  filter.isChecked ? "border border-black bg-gray-200" : ""
                }`}
              >
                {filter.isChecked ? (
                  <>
                    <span className="text-sm">{filter.name}</span>
                    <span className="ml-1">{filter.icon}</span>
                  </>
                ) : (
                  <span className="text-sm">{filter.name}</span>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal === "Filter" && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl border-gray-400 border flex flex-col"
            style={{
              width: "60vw",
              height: "60vh",
              maxWidth: "550px",
            }}
          >
            <div className="border border-gray-300 flex items-center justify-between px-4 py-4 rounded-tl-2xl rounded-tr-2xl">
              <div className="text-2xl font-bold text-gray">Filter</div>
              <div
                className="flex items-center justify-center w-7 h-7 bg-gray rounded-full shadow-sm cursor-pointer shadow-md"
                onClick={() => toggleIt("")}
              >
                <RxCross2 />
              </div>
            </div>

            <div className="flex-grow flex">
              <div className="w-1/3 border-r border-gray-300 flex flex-col relative">
                <div className="flex items-center relative">
                  <div className="bg-orange-600 w-1 h-full absolute left-0 top-0 bottom-0 rounded-tr-lg rounded-br-lg"></div>
                  <div className="text-gray-700 font-bold py-2 px-4">
                    Filter by Area
                  </div>
                </div>
              </div>
              <div
                className="w-2/3 sm:w-1/2 flex flex-col justify-start items-start"
                style={{
                  maxHeight: "calc(60vh - 8rem)",
                  overflow: "auto",
                }}
              >
                {fetch_area.map((a) => (
                  <label
                    key={a.strArea}
                    className="inline-flex items-center my-1 pl-4 pt-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-gray-400 focus:ring-orange-400 checked:bg-orange checked:border-transparent checked:text-orange"
                      name="area"
                      value={a.strArea}
                      onClick={() => setArea(a.strArea)}
                      defaultChecked={a.strArea === area}
                    />
                    <span className="ml-2 text-gray-400">{a.strArea}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center px-4 py-2 rounded-bl-2xl rounded-br-2xl flex justify-between items-center shadow-2xl shadow-opacity-100">
              <button
                className={`text-gray-400 font-bold w-1/2 sm:w-48 px-4 py-2 rounded-2xl ${
                  area !== "Indian" ? "text-orange-400" : "text-gray-400"
                }`}
                onClick={clearFilter}
              >
                Clear Filters
              </button>
              <button
                className="w-1/2 sm:w-48 bg-orange-600 text-white px-4 py-2 rounded-2xl ml-4 transition-transform duration-300 transform hover:scale-95"
                onClick={applyFilter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  fetch_area: state.mealReducer.fetch_area,
});

export default connect(mapStateToProps, { fetchArea })(Filters);

// This is Filter Component where I have implement functionality for Fitler and Sort By.
// Note: The rest filters are just for showcase, as not getting parameters to put in API. However, I tried to keep it like Swiggy's actual website with cross icons and UI/UX.
