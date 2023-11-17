import React, { useState } from "react";
import "../styles/Recipe.css"; // Import your CSS file for styling

const Recipe = ({ title, calories, image, ingredients }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`recipe-card ${isExpanded ? "expanded" : ""}`}>
      <div className="card-content">
        <img className="recipe-image" src={image} alt={title} />
        <h1 className="recipe-title">{title}</h1>
        <p className="calories">{Math.round(calories)} calories</p>
        <button className="more-button" onClick={toggleExpand}>
          {isExpanded ? "Less" : "More"}
        </button>
      </div>
      {isExpanded && (
        <div className="modal">
          <h2>Ingredients:</h2>
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.text}
              </li>
            ))}
          </ul>
          <button className="close-button" onClick={toggleExpand}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipe;
