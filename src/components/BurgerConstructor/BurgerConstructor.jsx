import React from "react";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { ORDER_DATA } from "../../utils/utils.js";
import AppContext from "../../services/AppContext.jsx";

const BurgerConstructor = () => {
  const { ingredientsScrollBox, section, ingridientBox, info } =
    burgerConstructorStyles;
  const [isOpened, setIsOpened] = React.useState(false);
  const ingredients = React.useContext(AppContext)
  return (
    <section className={`${section} pt-25`}>
      <div className={`ml-9 mb-4`}>
        <ConstructorElement
          key={ingredients[0]._id}
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
            <li className={`${ingridientBox} mb-4`} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
              />
            </li>
          ) : null
        )}
      </ul>
      <div className={`ml-9 mt-4`}>
        <ConstructorElement
          key={`${ingredients[0]._id} duble`}
          type="bottom"
          isLocked={true}
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image_mobile}
        />
      </div>
      <div className={`${info} mt-10 mr-4`}>
        <p className="text text_type_digits-medium mr-10">
          {ORDER_DATA.totalorder}&ensp;
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" onClick={() => setIsOpened(true)}>
          Оформить заказ
        </Button>
      </div>
      <Modal isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <OrderDetails orderData={ORDER_DATA} />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
