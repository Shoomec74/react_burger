import React, { FC, useMemo } from "react";
import orderElementStyles from "./orderElement.module.css";
import { useSelector } from "../../../services/actions-types/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import { formatDate } from "../../../utils/utils";
import { IOrder } from "../../../types";
import { TFeed } from "../../../types/data";

interface IProps {
  order: TFeed
}

const OrderElement: FC<IProps> = ({ order }) => {
  const {
    orderInfoBox,
    orderId,
    orderStructure,
    border,
    item,
    img,
    hideIngredients,
    hideIngredientsBackground,
    totalPrice,
  } = orderElementStyles;
  const MAX_FILLING_VIEW = 6;
  const VALUE_SHIFT_TO_LEFT = 48;
  const { ingredients } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
  }));

  const orderIngredientsData = useMemo(() => {
    return order.ingredients.map((id) => {
      return ingredients.find((item) => {
        return id === item._id;
      });
    });
  }, [ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, []);

  const fillingImage = () => {
    return orderIngredientsData.map((el, index) => {
      const uniqueID = nanoid();
      if (index > MAX_FILLING_VIEW - 1) {
        return null;
      } else if (
        index == MAX_FILLING_VIEW - 1 &&
        orderIngredientsData.length > MAX_FILLING_VIEW
      ) {
        return (
          <div
            className={border}
            style={{
              left: index * VALUE_SHIFT_TO_LEFT,
              zIndex: MAX_FILLING_VIEW - index,
            }}
            key={uniqueID}
          >
            <div className={item}>
              <img className={img} src={el?.image_mobile} alt={el?.name} />
              <div className={hideIngredientsBackground}></div>
              <p className={`text text_type_main-default ${hideIngredients}`}>
                +{orderIngredientsData.length - MAX_FILLING_VIEW}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div
            className={border}
            style={{
              left: index * VALUE_SHIFT_TO_LEFT,
              zIndex: MAX_FILLING_VIEW - index,
            }}
            key={uniqueID}
          >
            <div className={item}>
              <img className={img} src={el?.image_mobile} alt={el?.name} />
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={orderInfoBox}>
      <div className={`${orderId} pb-6`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </p>
      </div>
      <h2 className={`text text_type_main-medium pb-2`}>{order.name}</h2>
      {order?.status && (
        <p className={`text text_type_main-default pb-6`}>
          {order.status === "done"
            ? "Выполнен"
            : order.status === "pending"
            ? "Готовится"
            : order.status === "created"
            ? "Создан"
            : "Выполнен"}
        </p>
      )}
      <div className={orderStructure}>
        {fillingImage()}
        <p className={`text text_type_digits-default mb-1 mt-1 ${totalPrice}`}>
          {orderTotalPrice}&ensp;
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderElement;
