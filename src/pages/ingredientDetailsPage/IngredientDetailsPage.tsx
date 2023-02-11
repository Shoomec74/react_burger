import React, { FC, ReactNode } from "react";
import ingredientDetailsPageStyles from "./ingredientDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { IIngredient } from "../../types";

interface IProps {
  ingredients: Array<IIngredient>;
  children: ReactNode;
}

const IngredientDetailsPage: FC<IProps> = ({ ingredients, children }) => {
  const {
    ingredientDetailsPage,
    nutritionalValues,
    nutritionalValue,
    image,
    name,
  } = ingredientDetailsPageStyles;
  const { id } = useParams<{ id: string }>();
  const ingredient = ingredients.find(({ _id }) => _id === id);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={ingredientDetailsPage}>
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

export { IngredientDetailsPage };
