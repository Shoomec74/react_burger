import React, { useRef } from "react";
import constructorStyles from "./ConstructorItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import {
  swapIngredient,
  removeIngredient,
} from "../../../services/actions/burgerConstructor";
import { useDispatch } from "react-redux";

function ConstructorItem({ ingredient, index }) {
  const dispatch = useDispatch();

  const ingredientRef = useRef(null);

  const { ingridientBox } = constructorStyles;

  const { name, price, image_mobile } = ingredient;

  const [{ isDragging }, drag] = useDrag({
    type: "ingredients",
    item: { ...ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //const opacity = isDragging ? 1 : 1;

  const [{ isHover }, drop] = useDrop({
    accept: "ingredients",
    hover(ingredient) {
      if (!ingredientRef.current) {
        return;
      }
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      dispatch(swapIngredient(dragIndex, hoverIndex, ingredient));
      ingredient.index = hoverIndex;
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  drag(drop(ingredientRef));

  const deleteIngridient = (uniqueID) => {
    dispatch(removeIngredient(uniqueID));
  };

  return (
    <li
      className={`${ingridientBox} ${isHover ? constructorStyles.isHover : ""} mb-4`}
      key={ingredient.uniqueID}
      ref={ingredientRef}
      //style={{ opacity }}
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={() => deleteIngridient(ingredient.uniqueID)}
      />
    </li>
  );
}

export default ConstructorItem;
