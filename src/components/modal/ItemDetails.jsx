import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { fetchMealDetails, resetMealDetails } from "../../redux/slices";
import { connect } from "react-redux";

const ItemDetails = ({
  id,
  closeItemDetails,
  fetchMealDetails,
  meal_details,
  resetMealDetails,
}) => {
  useEffect(() => {
    if (id) {
      fetchMealDetails(id);
    }
    return () => resetMealDetails();
  }, [id]);

  const handleClose = () => {
    closeItemDetails();
  };

  return (
    <Dialog open={!!id} onClose={closeItemDetails} fullWidth maxWidth="sm">
      <DialogContent>
        <div className="mb-4 relative w-full">
          <img
            src={
              meal_details?.strMealThumb ||
              "https://via.placeholder.com/400x250"
            }
            alt="Item"
            className="rounded-lg w-full object-cover"
            style={{ maxHeight: "250px" }}
          />
        </div>
        <div className="text-2xl font-semibold mb-2">
          {meal_details?.strMeal ?? "N/A"}
        </div>
        <div className="text-gray-500 mb-4">
          #Tags: {meal_details?.strTags ?? "N/A"}
        </div>
        <div
          className="text-gray-700 overflow-y-auto"
          style={{ maxHeight: "300px" }}
        >
          {meal_details?.strInstructions
            ? meal_details.strInstructions.length > 200
              ? `${meal_details.strInstructions.substring(0, 200)}...`
              : meal_details.strInstructions
            : "N/A"}
        </div>
      </DialogContent>
      <div className="flex justify-center pb-4">
        <button
          className="bg-orange-600 text-white px-6 py-3 w-60 rounded-full transition-colors duration-300 hover:bg-orange-700"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  meal_details: state.mealReducer.meal_details,
});

export default connect(mapStateToProps, { fetchMealDetails, resetMealDetails })(
  ItemDetails
);

// This is the component working as a modal when clicked on any food meal through gallery to showcase some more info about it.
// Here, I have utilised material ui components.
// Note: Material UI is React compatible CSS framework.

