import React, { useEffect, useMemo } from "react";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { useSelector, useDispatch } from "react-redux";
import postOrder from "../../services/actions/orederDetails";
import { ORDER_MODAL, REFRESH_CONSTRUCTOR } from "../../utils/constants";
import { handleWievPopup } from "../../services/actions/modals";
import {
  addIngredient,
  addBun,
} from "../../services/actions/burgerConstructor";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import ConstructorItem from "./ConstructorItem/ConstructorItem";

const BurgerConstructor = () => {
  const [totalPrice, setTotalPrice] = React.useState(0);

  const dispatch = useDispatch();

  const { ingredientsScrollBox, section, info } = burgerConstructorStyles;

  const { bun, filling, order, name, isLoading, orderModal, isLogin } =
    useSelector((store) => ({
      bun: store.burgerConstructor.bun,
      filling: store.burgerConstructor.filling,
      order: store.order.order,
      name: store.order.name,
      isLoading: store.order.isLoading,
      orderModal: store.popup.orderModal,
      isLogin: store.authorization.isLogin,
    }));

  useEffect(() => {
    const total = filling.reduce(
      (sum, item) => sum + item.price,
      bun.length !== 0 ? bun.price * 2 : 0
    );
    setTotalPrice(total);
  }, [bun, filling]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const onDropHandler = (ingredient) => {
    const uniqueID = nanoid();
    ingredient.type === "bun"
      ? dispatch(addBun(ingredient, uniqueID))
      : dispatch(addIngredient(ingredient, uniqueID));
  };

  const inbgredientsId = React.useMemo(() => {
    const componentId = { ingredients: [] };
    componentId["ingredients"] = filling.map((ingredient) => ingredient._id);
    return componentId;
  }, [filling]);

  return (
    <section
      className={`${section} ${
        isHover ? burgerConstructorStyles.isHover : ""
      } pt-25`}
      ref={dropTarget}
    >
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
        <p className="text text_type_main-medium mt-4 mb-4">Положите булочку</p>
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
        <p className="text text_type_main-medium">Без ингридиентов не вкусно</p>
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
        <p className="text text_type_main-medium mt-4 mb-4">Положите булочку</p>
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
          disabled={!(bun.length !== 0 && filling.length !== 0) || !isLogin}
        >
          {isLoading ? "Оформляем..." : "Оформить заказ"}
        </Button>
      </div>
      {!isLoading && (
        <Modal
          isOpened={orderModal}
          onClose={() => {
            dispatch(handleWievPopup(ORDER_MODAL));
            dispatch({ type: REFRESH_CONSTRUCTOR });
          }}
        >
          <OrderDetails order={order} name={name} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
