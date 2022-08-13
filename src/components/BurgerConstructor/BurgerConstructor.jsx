import React, { useEffect, useMemo } from "react";
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
import {
  addIngredient,
  addBun,
} from "../../services/actions/burgerConstructor";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const BurgerConstructor = () => {
  const [totalPrice, setTotalPrice] = React.useState(0);

  const dispatch = useDispatch();

  const { ingredientsScrollBox, section, info } = burgerConstructorStyles;

  const { bun, filling, order, name, isLoading, orderModal } = useSelector(
    (store) => ({
      bun: store.burgerConstructor.bun,
      filling: store.burgerConstructor.filling,
      order: store.order.order,
      name: store.order.name,
      isLoading: store.order.isLoading,
      orderModal: store.popup.orderModal,
    })
  );


  useEffect(() => {
    const total = filling.reduce((sum, item) => sum + item.price, bun.length !== 0 ? (bun.price * 2) : 0);
    setTotalPrice(total);
}, [bun, filling])


  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver() ? 0.2 : 1,
    }),
  });

  const onDropHandler = (ingredient) => {
    const uniqueID = nanoid();
    ingredient.type !== "bun"
      ? dispatch(addIngredient(ingredient, uniqueID))
      : dispatch(addBun(ingredient, uniqueID));
  };

  const inbgredientsId = React.useMemo(() => {
    const componentId = { ingredients: [] };
    componentId["ingredients"] = filling.map((ingredient) => ingredient._id);
    return componentId;
  }, [filling]);

  return (
    <section className={`${section} pt-25`} ref={dropTarget}>
      {bun.length !== 0 ? (
        <div className={`ml-9 mb-4`}>
          <ConstructorElement
            key={bun.uniqueID}
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      ) : (
        <p>Положите булочку</p>
      )}
      {filling.length !== 0 ? (
        <ul className={ingredientsScrollBox}>
          {filling.map((ingredient, index) => (
            <ConstructorItem
              ingredient={ingredient}
              index={index}
              key={ingredient.uniqueID}
            />
          ))}
        </ul>
      ) : (
        <p>Без ингридиентов не вкусно</p>
      )}
      {bun.length !== 0 ? (
        <div className={`ml-9 mt-4`}>
          <ConstructorElement
            key={`${bun.uniqueID} duble`}
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      ) : (
        <p>Положите булочку</p>
      )}
      <div className={`${info} mt-10 mr-4`}>
        <p className="text text_type_digits-medium mr-10">
          {totalPrice}&ensp;
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            dispatch(postOrder(inbgredientsId));
            dispatch(handleWievPopup(ORDER_MODAL));
          }}
          disabled={!(bun.length !== 0 && filling.length !== 0)}
        >
          {isLoading ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>
      {!isLoading && (
        <Modal
          isOpened={orderModal}
          onClose={() => dispatch(handleWievPopup(ORDER_MODAL))}
        >
          <OrderDetails order={order} name={name} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
