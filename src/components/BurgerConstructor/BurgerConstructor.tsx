import React, { FC, useEffect, useMemo, useState } from "react";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import postOrder from "../../services/actions/orederDetails";
import { REFRESH_CONSTRUCTOR } from "../../utils/constants";
import * as ACTION_TYPES from "../../utils/constants";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../services/utils";
import { IDNDIngredient, IIngredient, TLocation } from "../../types";
import { hideModal, showModalOrder } from "../../services/actions/modals";

const BurgerConstructor: FC = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const history = useHistory<TLocation>();
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const { ingredientsScrollBox, section, info } = burgerConstructorStyles;

  const { bun, filling, order, name, isLoading, modalOrder } = useSelector(
    store => ({
      bun: store.burgerConstructor.bun,
      filling: store.burgerConstructor.filling,
      order: store.order.order,
      name: store.order.name,
      isLoading: store.order.isLoading,
      modalOrder: store.popup.modalOrder
    })
  );

  const bunIngredient = useMemo(() => {
    return bun[0];
  }, [bun]);

  useEffect(() => {
    const total = filling.reduce(
      (sum: number, item: IIngredient) => sum + item.price,
      bun.length !== 0 ? bunIngredient.price * 2 : 0
    );
    setTotalPrice(total);
  }, [bun, filling]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IDNDIngredient) {
      onDropHandler(ingredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const onDropHandler = (ingredient: IDNDIngredient) => {
    const uniqueID = nanoid();
    ingredient.type === "bun"
      ? dispatch({
          type: ACTION_TYPES.ADD_BUN,
          payload: { ...ingredient, uniqueID }
        })
      : dispatch({
          type: ACTION_TYPES.ADD_INGREDIENT,
          payload: { ...ingredient, uniqueID }
        });
  };

  const handlerCreateOrder = () => {
    if (!cookie) {
      history.replace({ pathname: "/login" });
      return;
    }
    dispatch(postOrder(inbgredientsId));
    dispatch(showModalOrder());
  };

  type TInbgredientsId = {
    ingredients: Array<string>;
  };

  let inbgredientsId = useMemo<TInbgredientsId>(() => {
    const componentId: TInbgredientsId = { ingredients: [] };
    componentId["ingredients"] = filling.map(
      (ingredient: IDNDIngredient) => ingredient._id
    );
    for (let i = 0; i < 2; i++) {
      componentId.ingredients.push(bunIngredient?._id);
    }
    return componentId;
  }, [filling, bun]);

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
            key={bunIngredient.uniqueID}
            type="top"
            isLocked={true}
            text={`${bunIngredient.name} (верх)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image_mobile}
          />
        </div>
      ) : (
        <p className="text text_type_main-medium mt-4 mb-4">Положите булочку</p>
      )}
      {filling.length !== 0 ? (
        <ul className={ingredientsScrollBox}>
          {filling.map((ingredient: IDNDIngredient, index: number) => (
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
            key={`${bunIngredient.uniqueID} duble`}
            type="bottom"
            isLocked={true}
            text={`${bunIngredient.name} (низ)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image_mobile}
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
          onClick={handlerCreateOrder}
          disabled={!(bun.length !== 0 && filling.length !== 0) || isLoading}
          htmlType={"button"}
        >
          {isLoading ? "Оформляем..." : "Оформить заказ"}
        </Button>
      </div>
      {!isLoading && (
        <Modal
          isOpened={modalOrder}
          onClose={() => {
            dispatch(hideModal());
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
