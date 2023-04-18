import React, { useState, useEffect } from "react";
import { getSuggestedNutrientIntake } from "../../helpers/helpers";
import NutrientListItem from "./NutrientListItem";
import axios from "axios";

function NutrientList(props) {
  const { userData } = props;

  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [potassium, setPotassium] = useState(0);
  const [vitaminA, setVitaminA] = useState(0);
  const [vitaminC, setVitaminC] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [iron, setIron] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);

  // ----------------------------------------------------
  const dayData = {
    calories,
    fat,
    carbohydrates,
    sodium,
    sugar,
    protein,
    fiber,
    potassium,
    vitamin_a: vitaminA,
    vitamin_c: vitaminC,
    calcium,
    iron,
    cholesterol,
  };
  // ----------------------------------------------------

  const fetchDayData = async () => {
    const url = "http://localhost:4000/dayInfo";

    try {
      const response = await axios.get(url, { withCredentials: true });
      // console.log(response.data.day);
      if (response.data.day) {
        setCalories(response.data.day.calories);
        setFat(response.data.day.fat);
        setCarbohydrates(response.data.day.carbohydrates);
        setSodium(parseFloat(response.data.day.sodium * 1000).toFixed(5));
        setSugar(parseFloat(response.data.day.sugar).toFixed(5));
        setProtein(parseFloat(response.data.day.protein).toFixed(5));
        setFiber(parseFloat(response.data.day.fiber).toFixed(5));
        setPotassium(parseFloat(response.data.day.potassium * 1000).toFixed(5));
        setVitaminA(
          parseFloat(response.data.day.vitamin_a * 1000000).toFixed(5)
        );
        setVitaminC(parseFloat(response.data.day.vitamin_c * 1000).toFixed(5));
        setCalcium(parseFloat(response.data.day.calcium * 1000).toFixed(5));
        setIron(parseFloat(response.data.day.iron * 1000).toFixed(5));
        setCholesterol(
          parseFloat(response.data.day.cholesterol * 1000).toFixed(5)
        );
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchDayData();
  }, []);

  const SuggestedData = getSuggestedNutrientIntake(userData);
  const arrOfIntakes = Object.entries(dayData).map(([key, value]) => {
    const obj = { [key]: { current: value } };
    if (SuggestedData.hasOwnProperty(key)) {
      obj[key]["suggested"] = SuggestedData[key];
    }
    return obj;
  });

  const arrOfNutrientListItems = arrOfIntakes.map((data) => {
    return <NutrientListItem data={data} />;
  });

  return <div>{arrOfNutrientListItems}</div>;
}

export default NutrientList;
