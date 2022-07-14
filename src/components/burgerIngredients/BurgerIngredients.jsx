import React from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientElement from "../IngredientElement/IngredientElement.jsx";

const BurgerIngredients = ({ ingredients }) => {
  const { section, ingredientsScrollBox, ingredientsTypeBox } = burgerIngredientsStyles;
  const [current, setCurrent] = React.useState("bun");

  return (
    <section className={`${section} mr-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      {current === "bun" && (
        <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
      )}
      {current === "sauce" && (
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
      )}
      {current === "main" && (
        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
      )}
      <div className={ingredientsScrollBox}>
        <ul className={ingredientsTypeBox}>
          {ingredients.map(
            (ingredient) =>
              ingredient.type.includes(current) && (
                <IngredientElement
                  key={ingredient._id}
                  ingredient={ingredient}
                  countIngredient={ingredient.__v}
                />
              )
          )}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
