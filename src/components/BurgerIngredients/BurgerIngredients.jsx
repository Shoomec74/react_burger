import React from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientElement from "./IngredientElement/IngredientElement.jsx";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { INGREDIENT_MODAL } from "../../utils/constants.js";
import { handleWievPopup } from "../../services/actions/modals";

const BurgerIngredients = () => {
  const { section, ingredientsScrollBox, ingredientsTypeBox, tabs } =
    burgerIngredientsStyles;
  const [current, setCurrent] = React.useState("bun");
  const dispatch = useDispatch();
  const { ingredients, ingredientModal, ingredientItem } = useSelector(
    (store) => ({
      ingredients: store.ingredients.ingredients,
      ingredientModal: store.popup.ingredientModal,
      ingredientItem: store.popup.ingredient,
    })
  );

  const [bunRef, bunInView] = useInView({
    threshold: 0.1,
  });

  const [sauceRef, sauceInView] = useInView({
    threshold: 0.1,
  });

  const [mainRef, mainInView] = useInView({
    threshold: 0.1,
  });

  const handleTabScroll = () => {
    switch (true) {
      case bunInView:
        setCurrent("buns");
        break;
      case sauceInView:
        setCurrent("sauces");
        break;
      case mainInView:
        setCurrent("main");
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    handleTabScroll();
  }, [bunInView, sauceInView, mainInView]);

  return (
    <section className={`${section} mr-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={tabs}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={handleButtonClick}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={handleButtonClick}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={handleButtonClick}
        >
          Начинки
        </Tab>
      </div>

      <div className={ingredientsScrollBox}>
        <h2 className="text text_type_main-medium pt-10 pb-6" id="buns">
          Булки
        </h2>
        <ul className={ingredientsTypeBox} ref={bunRef}>
          {ingredients.map(
            (ingredient) =>
              ingredient.type.includes("bun") && (
                <IngredientElement
                  key={ingredient._id}
                  ingredient={ingredient}
                  onClick={() => {
                    dispatch(handleWievPopup(INGREDIENT_MODAL, ingredient));
                  }}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6" id="sauces">
          Соусы
        </h2>
        <ul className={ingredientsTypeBox} ref={sauceRef}>
          {ingredients.map(
            (ingredient) =>
              ingredient.type.includes("sauce") && (
                <IngredientElement
                  key={ingredient._id}
                  ingredient={ingredient}
                  countIngredient={ingredient.__v}
                  onClick={() => {
                    dispatch(handleWievPopup(INGREDIENT_MODAL, ingredient));
                  }}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6" id="main">
          Начинки
        </h2>
        <ul className={ingredientsTypeBox} ref={mainRef}>
          {ingredients.map(
            (ingredient) =>
              ingredient.type.includes("main") && (
                <IngredientElement
                  key={ingredient._id}
                  ingredient={ingredient}
                  countIngredient={ingredient.__v}
                  onClick={() => {
                    dispatch(handleWievPopup(INGREDIENT_MODAL, ingredient));
                  }}
                />
              )
          )}
        </ul>
      </div>
      {ingredientModal && (
        <Modal
          isOpened={ingredientModal}
          onClose={() => dispatch(handleWievPopup(INGREDIENT_MODAL, null))}
        >
          <IngredientDetails ingredient={ingredientItem}>
            Детали ингридиента
          </IngredientDetails>
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;

//-- МНЕ ТАК НРАВИТСЯ БОЛЬШЕ --//
// return (
//   <section className={`${section} mr-10`}>
//     <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
//     <div style={{ display: "flex" }}>
//       <Tab active={current === "bun"} onClick={() => {setCurrent('bun'); setManifestation(1)}}>
//         Булки
//       </Tab>
//       <Tab active={current === "sauce"} onClick={() => {setCurrent('sauce'); setManifestation(1)}}>
//         Соусы
//       </Tab>
//       <Tab active={current === "main"} onClick={() => {setCurrent('main'); setManifestation(1)}}>
//         Начинки
//       </Tab>
//     </div>
//     {current === "bun" &&(
//       <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
//     )}
//     {current === "sauce" && (
//       <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
//     )}
//     {current === "main" && (
//       <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
//     )}
//     <div className={ingredientsScrollBox} >
//       <ul className={ingredientsTypeBox} onAnimationEnd={() => setManifestation(0)} manifestation={manifestation} ref={mainRef}>
//         {ingredients.map(
//           (ingredient) =>
//             ingredient.type.includes(current) && (
//               <IngredientElement
//                 key={ingredient._id}
//                 ingredient={ingredient}
//                 countIngredient={ingredient.__v}
//                 onClick={() => {
//                  dispatch(handleWievPopup(INGREDIENT_MODAL, ingredient));
//                  }}
//               />
//             )
//         )}
//       </ul>
//     </div>
//     {isOpened &&
//     <Modal isOpened={isOpened} onClose={() => dispatch(handleWievPopup(INGREDIENT_MODAL, null))}>
//       <IngredientDetails ingredient={ingredientItem}>
//         Детали ингридиента
//       </IngredientDetails>
//     </Modal>
//     }
//   </section>
// );
