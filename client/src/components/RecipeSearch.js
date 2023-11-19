import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import '../styles/RecipeSearch.css';

import { AuthContext } from '../context/AuthContext'; // Replace with the correct path
import { FaFilter } from 'react-icons/fa'


const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: '',
    excludeCuisine: '',
    diet: '',
    intolerances: '',
    equipment: '',
    includeIngredients: '',
    excludeIngredients: '',
    type: '',
    instructionsRequired: false,
    fillIngredients: false,
    addRecipeInformation: false,
    addRecipeNutrition: false,
    author: '',
    tags: '',
    recipeBoxId: 0,
    titleMatch: '',
    maxReadyTime: 0,
    ignorePantry: false,
    sort: '',
    sortDirection: 'asc',
    minCarbs: 0,
    maxCarbs: 100,
    minProtein: 0,
    maxProtein: 100,
    minCalories: 0,
    maxCalories: 800,
    minFat: 1,
    maxFat: 100,
  });
  const cuisines = ["Italian", "Chinese", "Mexican", "Indian"];
  const diets = ["Vegetarian", "Vegan", "Gluten-Free", "Ketogenic", "Paleo"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

  const { user } = useContext(AuthContext); // Assuming user info is stored in AuthContext





  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  const searchRecipes = async () => {
    const apiKey = '696e7c0febe142e290fd0d079e201cb1';
    if (!query) {
      console.log('query is empty');
      return;
    } else {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/search`, {
          params: {
            apiKey,
            query,
            number: 20,
            ...filters,
          },
        });

        // const response = await axios.get(
        //   `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${query}&number=10`
        // );

        const data = response.data;
        console.log("data", response)
        setRecipes(data.results); // Assuming 'results' is the correct key
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  };

  useEffect(() => {
    if (query) {
      searchRecipes();
    }
  }, [query]); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("user",user)
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
      <div className="top-section">
        <div className="recipe-search-bar">
          <button
            className="filter-toggle-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {/* Filter Icon */}
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchRecipes();
            }}
          >
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

        {showFilters && (
          <div className="recipe-filters">
            {/* Filter components here */}
            {/* Cuisine Filter */}
            <label>
              Cuisine:
              <select
                value={filters.cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              >
                <option value="">Select Cuisine</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </label>

            {/* Diet Filter */}
            <label>
              Diet:
              <select
                value={filters.diet}
                onChange={(e) => handleFilterChange('diet', e.target.value)}
              >
                <option value="">Select Diet</option>
                {diets.map((diet) => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>
            </label>

            {/* Meal Type Filter */}
            <label>
              Type:
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">Select Type</option>
                {mealTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>

            {/* Preparation Time Slider */}
            <label>
              Max Preparation Time (minutes):
              <input
                type="range"
                min="0"
                max="120"
                value={filters.maxReadyTime}
                onChange={(e) => handleFilterChange('maxReadyTime', e.target.value)}
              />
              <span>{filters.maxReadyTime} minutes</span>
            </label>


            {/* Repeat similar blocks for other filters like Diet, Type, etc. */}

            {/* Add sliders, checkboxes, and other components as needed */}
          </div>
        )}
      </div>
      <div className="recipe-grid">
        {recipes.length === 0 ? (
          <div className="no-recipes-message">No recipes found</div>
        ) : (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
              image={`https://spoonacular.com/recipeImages/${recipe.image}`}
              sourceUrl={recipe.sourceUrl}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default RecipeSearch;
