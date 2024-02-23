import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Filters from "./components/Filters";
import FoodItem from "./components/FoodItem";
import ItemDetails from "./components/modal/ItemDetails";
import Footer from "./components/Footer";
import { connect } from "react-redux";
import { fetchMeals } from "./redux/slices";

export const App = ({ fetchMeals, meals }) => {
  const [pickItemId, setPickItemId] = useState(null);
  const [showMeals, setShowMeals] = useState([]);
  const [actualArea, setActualArea] = useState("Indian");
  const [actualSortBy, setActualSortBy] = useState("");

  useEffect(() => {
    fetchMeals(actualArea);
  }, [actualArea]);

  useEffect(() => {
    let storeData = [];
    if (meals.length > 0 && actualSortBy) { // if meals having data and actualSoryBy(mean to say behind the scene is "A-Z").
      storeData = [...showMeals];
      storeData.sort((x, y) => x.strMeal.localeCompare(y.strMeal));
      setShowMeals(storeData);
    } else if (meals.length > 0) {
      meals.forEach((list) => {
        storeData.push(list);
      });
    }
    setShowMeals(storeData);
  }, [meals, actualSortBy]);

  const showItemDetails = (id) => {
    setPickItemId(id);
  };
  const closeItemDetails = () => {
    setPickItemId(null);
  };

  return (
    <>
      <Header />
      <Filters
        actualArea={actualArea}
        setActualArea={setActualArea}
        actualSortBy={actualSortBy}
        setActualSortBy={setActualSortBy}
      />
      <FoodItem meals={showMeals} showItemDetails={showItemDetails} />
      <ItemDetails id={pickItemId} closeItemDetails={closeItemDetails} />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  meals: state.mealReducer.meals,
  loading: state.mealReducer.loading,
  error: state.mealReducer.error,
});

export default connect(mapStateToProps, { fetchMeals })(App);
