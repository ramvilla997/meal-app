// Recipe.js
import React from "react";
import "../styles/Recipe.css"; // Make sure this path is correct

const Recipe = ({ title, readyInMinutes, servings, image, sourceUrl }) => {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-info">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-meta">
          Ready in {readyInMinutes} mins | {servings} servings
        </p>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="recipe-button">
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default Recipe;
