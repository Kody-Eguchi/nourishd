import axios from "axios";

export async function fetchFavouriteRecipes(setFavouriteRecipes) {
  try {
    const response = await axios.get("/userFavourites", {
      withCredentials: true,
    });
    setFavouriteRecipes(response.data.recipe);
  } catch (error) {
    console.log(error);
  }
}
