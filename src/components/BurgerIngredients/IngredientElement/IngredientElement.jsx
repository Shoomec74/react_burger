import React from "react";
import ingredientElementStyles from "./largeIngredientView.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

const IngredientElement = ({ ingredient, onClick }) => {
  const { ingredientBox, image, count, name } = ingredientElementStyles;

  const { filling } = useSelector((store) => ({
    filling: store.burgerConstructor.filling,
  }));

  const findDuplicates = (ingredient) =>
    filling.filter((item) => item.name === ingredient.name);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  return (
    <>
      <li
        className={`${ingredientBox} mr-6 ml-4`}
        onClick={onClick}
        style={{ opacity }}
        ref={dragRef}
      >
        <img
          className={`${image} ml-4 mr-4`}
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        {findDuplicates(ingredient).length > 0 && (
          <Counter count={findDuplicates(ingredient).length} size="default" />
        )}
        <p className={`text text_type_digits-default mb-1 mt-1 ${count}`}>
          {ingredient.price}&ensp;
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${name} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </li>
    </>
  );
};

IngredientElement.propTypes = {
  ingredient: PropTypes.object,
  countIngredient: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default IngredientElement;
