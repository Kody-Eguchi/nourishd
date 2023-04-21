import React from "react";
import axios from "axios";
import useShow from "../../hooks/useShow";
import Card from "../Card";

function FavouriteListItem(props) {
  const [value, showValue] = useShow();
  const addToMeal = async function () {
    const queryName = props.title.split(" ").join("-");
    const urlOne = `http://localhost:4000/recipes/${queryName}`;

    const requestDataOne = {
      recipe_id: props.recipe_id,
    };
    const nutrientInfo = await axios(urlOne, {
      params: requestDataOne,
      withCredentials: true,
    });

    const urlTwo = "http://localhost:4000/updateDayInfo";

    const {
      label,
      calories,
      yield: serving,
      totalNutrients: {
        FAT: { quantity: fat },
        CHOCDF: { quantity: carbohydrates },
        NA: { quantity: sodium },
        SUGAR: { quantity: sugar },
        PROCNT: { quantity: protein },
        FIBTG: { quantity: fiber },
        K: { quantity: potassium },
        VITA_RAE: { quantity: vitaminA },
        VITC: { quantity: vitaminC },
        CA: { quantity: calcium },
        FE: { quantity: iron },
        CHOLE: { quantity: cholesterol },
      },
    } = nutrientInfo.data;

    const caloriesPerServing = calories / serving;
    const fatPerServing = fat / serving;
    const carbohydratesPerServing = carbohydrates / serving;
    const sodiumPerServing = sodium / serving / 1000;
    const sugarPerServing = sugar / serving;
    const proteinPerServing = protein / serving;
    const fiberPerServing = fiber / serving;
    const potassiumPerServing = potassium / serving / 1000;
    const vitaminAPerServing = vitaminA / serving / 1000000;
    const vitaminCPerServing = vitaminC / serving / 1000;
    const calciumPerServing = calcium / serving / 1000;
    const ironPerServing = iron / serving / 1000;
    const cholesterolPerServing = cholesterol / serving / 1000;

    const requestDataTwo = {
      day: {
        calories: caloriesPerServing,
        fat: fatPerServing,
        carbohydrates: carbohydratesPerServing,
        sodium: sodiumPerServing,
        sugar: sugarPerServing,
        protein: proteinPerServing,
        fiber: fiberPerServing,
        potassium: potassiumPerServing,
        vitamin_a: vitaminAPerServing,
        vitamin_c: vitaminCPerServing,
        calcium: calciumPerServing,
        iron: ironPerServing,
        cholesterol: cholesterolPerServing,
        history: { [label]: props.recipe_id },
      },
    };

    await axios.post(urlTwo, requestDataTwo, {
      withCredentials: true,
    });
    showValue();
  };

  const removeFromFavourites = async (id) => {
    const url = `http://localhost:4000/favourites/${id}`;

    await axios
      .delete(url, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        fetchFavouriteRecipes();
      })
      .catch((error) => console.log(error));
  };

  const fetchFavouriteRecipes = async () => {
    const url = "http://localhost:4000/userFavourites";

    await axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        props.setFavouriteRecipes(res.data.recipe);
      });
  };

  return (
    <div className="card col">
      {value && <Card message="Added Records" className="alert" />}
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <ul>
        {props.ingredient_lines.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {props.diet_labels.map((dietLabel) => (
          <span className="badge rounded-pill bg-success">{dietLabel}</span>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {props.health_labels.map((healthLabel) => (
          <span className="badge rounded-pill bg-warning">{healthLabel}</span>
        ))}
      </div>

      {/* <p className="badge bg-success">
        {Math.floor(props.calories / props.yield)} calories per serving
      </p> */}
      <button className="btn btn-outline-primary" onClick={addToMeal}>
        Add 1 serving to tracker
      </button>
      <button className="btn btn-outline-primary" onClick={() => removeFromFavourites(props.id)}>
        Remove from favourites
      </button>
    </div>
  );
}

export default FavouriteListItem;
