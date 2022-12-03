import React, { useMemo, useState } from "react";
import ingredientElementStyles from "./largeIngredientView.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { ingredientType } from "../../../utils/types";
import { useLocation, Link } from "react-router-dom";

const IngredientElement = ({ ingredient, onClick }) => {
  const { ingredientBox, image, count, name, link } = ingredientElementStyles;
  const [allIngredients, setAllIngredienst] = useState([]);
  const location = useLocation();
  const { filling, bun } = useSelector((store) => ({
    filling: store.burgerConstructor.filling,
    bun: store.burgerConstructor.bun,
  }));

  useMemo(() => {
    setAllIngredienst(filling.concat(bun));
  }, [filling, bun]);

  const findDuplicates = (ingredient) =>
    allIngredients.filter((item) => item.name === ingredient.name);

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
        <Link
          className={link}
          to={{
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: location },
          }}
        >
          <img
            className={`${image} ml-4 mr-4`}
            src={ingredient.image_large}
            alt={ingredient.name}
          />
          {findDuplicates(ingredient).length > 0 &&
          ingredient.type !== "bun" ? (
            <Counter count={findDuplicates(ingredient).length} size="default" />
          ) : (
            findDuplicates(ingredient).length > 0 && (
              <Counter
                count={findDuplicates(ingredient).length * 2}
                size="default"
              />
            )
          )}
          <p className={`text text_type_digits-default mb-1 mt-1 ${count}`}>
            {ingredient.price}&ensp;
            <CurrencyIcon type="primary" />
          </p>
          <p className={`${name} text text_type_main-default`}>
            {ingredient.name}
          </p>
        </Link>
      </li>
    </>
  );
};

IngredientElement.propTypes = {
  ingredient: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientElement;
