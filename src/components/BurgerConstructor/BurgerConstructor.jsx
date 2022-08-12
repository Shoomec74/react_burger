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
import postOrder from "../../services/actions/orederDetails";
import { ORDER_MODAL } from "../../utils/constants";
import { handleWievPopup } from "../../services/actions/modals";
import { addIngredient, addBun } from "../../services/actions/burgerConstructor";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";

const BurgerConstructor = () => {
  const [totalPrice, setTotalPrice] = React.useState(0);

  const dispatch = useDispatch();

  const { ingredientsScrollBox, section, ingridientBox, info, abracadabra } = burgerConstructorStyles;

  const {filling, bun, order, name, isLoading, orderModal} = useSelector(store => ({
    filling: store.constructor.filling,
    bun: store.constructor.bun,
    order: store.order.order,
    name: store.order.name,
    isLoading: store.order.isLoading,
    orderModal: store.popup.orderModal
  }));

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver(),
  }),
    drop(ingredient) {
        onDropHandler(ingredient);
    }
})

const onDropHandler = (ingredient) => {
  const uniqueID = nanoid();
  ingredient.type !== 'bun' ? dispatch(addIngredient(ingredient, uniqueID)) : dispatch(addBun(ingredient, uniqueID))
}

  // const rundBun = React.useMemo(() => {
  //   const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  //   return buns[Math.floor(Math.random() * buns.length)];
  // }, [ingredients]);

  // const ingredientsSort = React.useMemo(() => {
  //   const arr = ingredients.filter(
  //     (ingredient, index) =>
  //       ingredient.type !== "bun" &&
  //       index < Math.floor(Math.random() * ingredients.length)
  //   );
  //   return arr;
  // }, [ingredients]);

  // const inbgredientsId = React.useMemo(() => {
  //     const componentId = { ingredients: [] };
  //   componentId["ingredients"] = ingredients.map(
  //     (ingredient) => ingredient._id
  //   );
  //   return componentId;
  // }, [ingredients]);

  return (
    <section className={`${section} pt-25`} >

      <div className={`${abracadabra}`} ref={dropTarget}></div>
      {bun ? <div className={`ml-9 mb-4`}>
        <ConstructorElement
          key={bun._id}
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div> : <p>Положите булочку</p>}
      {filling ? <ul className={ingredientsScrollBox}>
        {filling.map((ingredient) => (
          <li className={`${ingridientBox} mb-4`} key={ingredient._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}
            />
          </li>
        ))}
      </ul> : <p>Без ингридиентов не вкусно</p>}
      {bun > 0 ? <div className={`ml-9 mt-4`}>
        <ConstructorElement
          key={`${bun._id} duble`}
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div> : <p>Положите булочку</p>}
      <div className={`${info} mt-10 mr-4`}>
        <p className="text text_type_digits-medium mr-10">
          {0}&ensp;
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            console.log(filling)
            //dispatch(postOrder(inbgredientsId));
            dispatch(handleWievPopup(ORDER_MODAL));
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {!isLoading && (
        <Modal isOpened={orderModal} onClose={() => dispatch(handleWievPopup(ORDER_MODAL))}>
          <OrderDetails order={order} name={name}/>
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
