import React, { useState } from "react";
import "../styles/Recipe.css"; // Import your CSS file for styling

const Recipe = ({ title, calories, image, ingredients }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`recipe-card ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="recipe-image-container">
        <img className="recipe-image" src={image} alt={title} />
        <div className="recipe-details">
          <h2 className="recipe-title">{title}</h2>
          <p className="calories">{Math.round(calories)} calories</p>
        </div>
      </div>
      <div className={`modal ${isHovered ? "expanded" : ""}`}>
        <div className="modal-content">
          <h3>Ingredients:</h3>
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
