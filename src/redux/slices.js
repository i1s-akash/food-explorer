import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  meals: [],
  meal_details: [],
  fetch_area: [],
  err: "",
};

// To Featch Meals Asyncronously
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async (area) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    return response.data.meals;
  } catch (error) {
    throw error.response.data;
  }
});

// To Fetch Meals Details Asyncronously
export const fetchMealDetails = createAsyncThunk(
  "meals/fetchMealDetails",
  async (mealId) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      return response.data.meals[0];
    } catch (error) {
      throw error.response.data;
    }
  }
);

// To Fetch Area Asyncronously
export const fetchArea = createAsyncThunk("meals/fetchArea", async () => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    return response.data.meals;
  } catch (error) {
    throw error.response.data;
  }
});

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    // Have created just to avoiding inconsistency with data.
    resetMealDetails: (state) => {
      state.meal_details = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.err = "";
        state.meals = [];
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
        state.err = "";
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.meals = [];
      })
      .addCase(fetchMealDetails.pending, (state) => {
        state.loading = true;
        state.err = "";
        state.meal_details = [];
      })
      .addCase(fetchMealDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.meal_details = action.payload;
        state.err = "";
      })
      .addCase(fetchMealDetails.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.meal_details = [];
      })
      .addCase(fetchArea.pending, (state) => {
        state.loading = true;
        state.err = "";
        state.fetch_area = [];
      })
      .addCase(fetchArea.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_area = action.payload;
        state.err = "";
      })
      .addCase(fetchArea.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.fetch_area = [];
      });
  },
});

export default mealsSlice.reducer;
export const { resetMealDetails } = mealsSlice.actions;
