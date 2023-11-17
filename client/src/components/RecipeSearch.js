import React, { useEffect, useState, useContext, useCallback } from "react";
import Recipe from "./Recipe";
import { AuthContext } from '../context/AuthContext'; // Import context if needed
import axios from 'axios';

const RecipeSearch = () => {
  const APP_ID = "6d6687a7"; // Replace with your actual APP ID
  const APP_KEY = "276a106691ab94fd9dec2d5082fe0965"; // Replace with your actual APP Key

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(""); // Set to an empty string or default search term
  const [profile, setProfile] = useState({
    tastePreferences: '',
    dietaryRestrictions: [],
    preferredCuisines: [],
    mealTypes: [],
    shoppingFrequency: '',
  }); // Define profile state
  const { user } = useContext(AuthContext); // If you're using the AuthContext
  const getRecipes = useCallback(async () => {
    try {
      const queryParameters = {
        q: profile.tastePreferences || "indian", // Use tastePreferences from profile
        app_id: APP_ID,
        app_key: APP_KEY,
      };
      console.log("queryParameters",queryParameters)
      const response = await axios.get('https://api.edamam.com/search', {
        params: queryParameters,
      });
      const data = response.data;
      setRecipes(data.hits);
    } catch (error) {
      console.error(error);
    }
  }, [profile.tastePreferences, APP_ID, APP_KEY]);

  useEffect(() => {
    console.log("user",user)
    if (user) {
      // Set the profile preferences from the user's profile
      setProfile({
        tastePreferences: user.tastePreferences || '', // Use the appropriate property from user profile
      });
    } else {
      getRecipes();
    }
  }, [user, getRecipes]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };

  const cuisines = {};

  recipes.forEach(recipe => {
    const cuisine = recipe.recipe.cuisineType || "Other"; // Use "Other" if cuisineType is not available
    if (!cuisines[cuisine]) {
      cuisines[cuisine] = [];
    }

    cuisines[cuisine].push(recipe);
  });

  return (
    <div>
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit">Search</button>
      </form>

      {Object.keys(cuisines).map(cuisine => (
        <div key={cuisine}>
          <h2>{cuisine}</h2>
          <div className="recipe-grid">
            {cuisines[cuisine].map(recipe => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeSearch;
