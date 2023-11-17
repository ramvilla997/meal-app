// client/src/components/RecipeList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await axios('/api/recipes');
      setRecipes(result.data);
    };
    
    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe._id}>{recipe.name}</div>
      ))}
    </div>
  );
};

export default RecipeList;
