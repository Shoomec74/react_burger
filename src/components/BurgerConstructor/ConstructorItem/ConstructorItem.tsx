import React, { useRef } from "react";
import constructorStyles from "./ConstructorItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../../services/actions-types/hooks";
import * as ACTION_TYPES from "../../../utils/constants";
import { IDNDIngredient } from "../../../types";

interface Props {
  ingredient: IDNDIngredient;
  index: number;
}

const ConstructorItem: React.FC<Props> = ({ ingredient, index }) => {
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
    hover(ingredient: IDNDIngredient) {
      if (!ingredientRef.current) {
        return;
      }
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      dispatch({
        type: ACTION_TYPES.SWAP_INGREDIENT,
        payload: { hoverIndex: hoverIndex, dragIndex: dragIndex },
      });
      ingredient.index = hoverIndex;
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  drag(drop(ingredientRef));

  const deleteIngridient = (uniqueID: string) => {
    dispatch({ type: ACTION_TYPES.REMOVE_INGREDIENT, payload: uniqueID });
  };

  return (
    <li
      className={`${ingridientBox} ${
        isHover ? constructorStyles.isHover : ""
      } mb-4`}
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
};

export default ConstructorItem;
