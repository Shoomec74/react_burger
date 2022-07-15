import React from "react";
import ingredientElementStyles from "./largeIngredientView.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import PropTypes from "prop-types";

const IngredientElement = ({ ingredient, countIngredient }) => {
  const { ingredientBox, image, count, name } = ingredientElementStyles;
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
    <li className={`${ingredientBox} mr-6 ml-4`}  onClick={() => setIsOpened(true)}>
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
    <Modal isOpened={isOpened} onClose={() => setIsOpened(false)}>
      <IngredientDetails ingredient={ingredient} >
        Детали ингридиента
      </IngredientDetails>
    </Modal>
    </>
  );
  IngredientElement.propTypes ={
    ingredient: PropTypes.object,
    countIngredient: PropTypes.number
  }
};

export default IngredientElement;
