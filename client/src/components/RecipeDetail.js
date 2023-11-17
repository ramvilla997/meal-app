// client/src/components/RecipeDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const { id } = useParams(); // This id comes from the URL parameter

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await axios.get(`/api/recipes/${id}`);
      setRecipe(result.data);
      // Initialize all ingredients as unchecked
      let initialCheckState = {};
      result.data.ingredients.forEach(ingredient => {
        initialCheckState[ingredient._id] = false;
      });
      setCheckedIngredients(initialCheckState);
    };

    fetchRecipe();
  }, [id]);

  const handleCheck = (ingredientId) => {
    setCheckedIngredients({
      ...checkedIngredients,
      [ingredientId]: !checkedIngredients[ingredientId]
    });
  };

  const handleAddToShoppingList = async (ingredientId) => {
    // Logic to add the ingredient to the user's shopping list
    // Assume we have an API endpoint to add items to the shopping list
    try {
      const ingredient = recipe.ingredients.find(ing => ing._id === ingredientId);
      await axios.post('/api/shopping-list', { ingredient });
      // Optionally, give user feedback or update the UI
    } catch (error) {
      console.error('Error adding to shopping list:', error);
      // Handle error, potentially show message to user
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.instructions}</p>
      {/* Render ingredients and other details here */}
      {recipe.ingredients.map(ingredient => (
        <div key={ingredient._id}>
          <input
            type="checkbox"
            id={ingredient._id}
            checked={checkedIngredients[ingredient._id]}
            onChange={() => handleCheck(ingredient._id)}
          />
          <label htmlFor={ingredient._id}>{ingredient.name}</label>
          <button onClick={() => handleAddToShoppingList(ingredient._id)}>Add to Shopping List</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetail;
