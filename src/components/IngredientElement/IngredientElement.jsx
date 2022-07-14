import React from "react";
import ingredientElementStyles from "./largeIngredientView.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ ingredient, countIngredient }) => {
  const { ingredientBox, image, count, name } = ingredientElementStyles;

  return (
    <li className={`${ingredientBox} mr-6 ml-4`}>
      <img
        className={`${image} ml-4 mr-4`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      {countIngredient > 0 && (
        <Counter count={countIngredient} size="default" />
      )}
      <p className={`text text_type_digits-default mb-1 mt-1 ${count}`}>
        {ingredient.price}&ensp;
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${name} text text_type_main-default`}>{ingredient.name}</p>
    </li>
  );
};

export default IngredientElement;
