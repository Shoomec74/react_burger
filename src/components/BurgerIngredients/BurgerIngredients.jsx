import React from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientElement from "../IngredientElement/IngredientElement.jsx";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const { section, ingredientsScrollBox, ingredientsTypeBox } = burgerIngredientsStyles;
  const [current, setCurrent] = React.useState("bun");
  const [manifestation, setManifestation] = React.useState(0);
  const [ingredientItem, setIngredientItem] = React.useState(null);
  const [isOpened, setIsOpened] = React.useState(false);
  const ingredients = useSelector(store => store.ingredients.ingredients);

  return (
    <section className={`${section} mr-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab active={current === "bun"} onClick={() => {setCurrent('bun'); setManifestation(1)}}>
          Булки
        </Tab>
        <Tab active={current === "sauce"} onClick={() => {setCurrent('sauce'); setManifestation(1)}}>
          Соусы
        </Tab>
        <Tab active={current === "main"} onClick={() => {setCurrent('main'); setManifestation(1)}}>
          Начинки
        </Tab>
      </div>
      {current === "bun" &&(
        <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
      )}
      {current === "sauce" && (
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
      )}
      {current === "main" && (
        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
      )}
      <div className={ingredientsScrollBox} >
        <ul className={ingredientsTypeBox} onAnimationEnd={() => setManifestation(0)} manifestation={manifestation}>
          {ingredients.map(
            (ingredient) =>
              ingredient.type.includes(current) && (
                <IngredientElement
                  key={ingredient._id}
                  ingredient={ingredient}
                  countIngredient={ingredient.__v}
                  onClick={() => {setIsOpened(true); setIngredientItem(ingredient)}}
                />
              )
          )}
        </ul>
      </div>
      {isOpened &&
      <Modal isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <IngredientDetails ingredient={ingredientItem}>
          Детали ингридиента
        </IngredientDetails>
      </Modal>
      }
    </section>
  );
};

export default BurgerIngredients;
