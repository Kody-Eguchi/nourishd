import React from "react";
import axios from "axios";

function RecipeListItem(props) {
  const addToMeal = async function () {
    const url = "http://localhost:4000/updateDayInfo";

    const requestData = {
      day: {
        calories: props.caloriesPerServing,
        fat: props.fatPerServing,
        carbohydrates: props.carbohydratesPerServing,
        sodium: props.sodiumPerServing,
        sugar: props.sugarPerServing,
        protein: props.proteinPerServing,
        fiber: props.fiberPerServing,
        potassium: props.potassiumPerServing,
        vitamin_a: props.vitaminAPerServing,
        vitamin_c: props.vitaminCPerServing,
        calcium: props.calciumPerServing,
        iron: props.ironPerServing,
        cholesterol: props.cholesterolPerServing,
      },
    };

    try {
      const response = await axios.post(url, requestData, {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log("Success");
      } else {
        console.log("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during login: " + error.message);
    }
  };

  return (
    <div className="card col">
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <ul>
        {props.ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      <p>Serving Size: {props.yield}</p>
      <p className="badge bg-warning">{props.calories} calories</p>
      <button onClick={addToMeal}>Add 1 serving to tracker</button>
    </div>
  );
}

export default RecipeListItem;
