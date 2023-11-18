import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import '../styles/RecipeSearch.css';

import { AuthContext } from '../context/AuthContext'; // Replace with the correct path

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const { user } = useContext(AuthContext); // Assuming user info is stored in AuthContext



  const searchRecipes = async (query) => {
    const APP_ID = "6d6687a7";
    const APP_KEY = "276a106691ab94fd9dec2d5082fe0965";
    if (!query) {
      console.log("query is empty")
      return; // Do not make API call if query is undefined or empty
    } else {
      try {
        const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        console.log("response", response);
        setRecipes(response.data.hits); // Assuming 'hits' is the correct key
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  };
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`/api/user/profile`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const profile = response.data;
          if (profile.tastePreferences) {

          setQuery(profile.tastePreferences || '');
          searchRecipes(profile.tastePreferences || '');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };


    fetchUserProfile();
  }, [user]);



  return (
    <div className="recipe-search-container">
      <div className="recipe-search-overlay"></div>
      <div className="recipe-search-bar">
        <form onSubmit={(e) => {
          e.preventDefault();
          searchRecipes(query);
        }}>
          <input
            type="text"
            className="recipe-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes"
          />
          <button type="submit" className="recipe-search-button">Search</button>
        </form>
      </div>
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        ) : (
          <div className="recipe-search-container">

          <div className="recipe-grid">
            No Recipes Found
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
