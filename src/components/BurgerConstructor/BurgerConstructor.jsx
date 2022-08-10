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
import { useSelector, useDispatch } from "react-redux";
import postOrder from "../../services/actions/butgerConstructor";

const BurgerConstructor = () => {
  // начальное значение стейта
  const initialState = { orderSum: 0 };
  // функция-редьюсер
  // изменяет состояния
  function reducer(orderSum, action) {
    return { orderSum: orderSum.orderSum + action.price };
  }

  const [orderSum, dispatch] = React.useReducer(reducer, initialState);

  const { ingredientsScrollBox, section, ingridientBox, info } =
    burgerConstructorStyles;
  const [isOpened, setIsOpened] = React.useState(false);

  const {ingredients, order, name, isLoading} = useSelector(store => ({
    ingredients: store.ingredients.ingredients,
    order: store.order.order,
    name: store.order.name,
    isLoading: store.order.isLoading,
  }));


  const rundBun = React.useMemo(() => {
    const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
    return buns[Math.floor(Math.random() * buns.length)];
  }, [ingredients]);

  const ingredientsSort = React.useMemo(() => {
    const arr = ingredients.filter(
      (ingredient, index) =>
        ingredient.type !== "bun" &&
        index < Math.floor(Math.random() * ingredients.length)
    );
    arr.map((item) => dispatch({ price: item.price }));
    dispatch({ price: rundBun.price * 2 });
    return arr;
  }, [ingredients]);

  const inbgredientsId = React.useMemo(() => {
    const componentId = { ingredients: [] };
    componentId["ingredients"] = ingredientsSort.map(
      (ingredient) => ingredient._id
    );
    return componentId;
  }, [ingredients]);

  return (
    <section className={`${section} pt-25`}>
      <div className={`ml-9 mb-4`}>
        <ConstructorElement
          key={rundBun._id}
          type="top"
          isLocked={true}
          text={`${rundBun.name} (верх)`}
          price={rundBun.price}
          thumbnail={rundBun.image_mobile}
        />
      </div>
      <ul className={ingredientsScrollBox}>
        {ingredientsSort.map((ingredient) => (
          <li className={`${ingridientBox} mb-4`} key={ingredient._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}
            />
          </li>
        ))}
      </ul>
      <div className={`ml-9 mt-4`}>
        <ConstructorElement
          key={`${rundBun._id} duble`}
          type="bottom"
          isLocked={true}
          text={`${rundBun.name} (низ)`}
          price={rundBun.price}
          thumbnail={rundBun.image_mobile}
        />
      </div>
      <div className={`${info} mt-10 mr-4`}>
        <p className="text text_type_digits-medium mr-10">
          {orderSum.orderSum}&ensp;
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsOpened(true);
            postOrder(inbgredientsId);
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {!isLoading && (
        <Modal isOpened={isOpened} onClose={() => setIsOpened(false)}>
          <OrderDetails order={order} name={name}/>
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
