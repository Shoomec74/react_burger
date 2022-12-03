import React from "react";
import ingredientDetailsStyles from "./ingredientDetails.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ ingredient, children }) => {
  const { popup, nutritionalValues, nutritionalValue, image, name } =
    ingredientDetailsStyles;

  return (
    <div className={popup}>
      <h2 className="text text_type_main-large mt-10 mr-10 ml-10">
        {children}
      </h2>
      <img
        className={image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h3 className={`${name} text text_type_main-medium mt-4 mb-8`}>
        {ingredient.name}
      </h3>
      <ul className={`${nutritionalValues} mb-15`}>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p
            className={`${nutritionalValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p
            className={`${nutritionalValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p
            className={`${nutritionalValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p
            className={`${nutritionalValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default IngredientDetails;
