import React from "react";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ ingredients }) => {
  const { ingredientsScrollBox, section, ingridientBox, info } = burgerConstructorStyles;

  return (
    <section className={`${section} pt-25`}>
      <div className={`ml-9 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredients[0].name} (верх)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image_mobile}
        />
      </div>
      <ul className={ingredientsScrollBox}>
        {ingredients.map((ingredient) =>
          ingredient.type !== "bun" ? (
            <li className={`${ingridientBox} mb-4`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
              />
            </li>
          ) : (<></>)
        )}
      </ul>
      <div className={`ml-9 mt-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image_mobile}
        />
      </div>
      <div className={`${info} mt-10 mr-4`}>
        <p className="text text_type_digits-medium mr-10">
          888&ensp;
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
