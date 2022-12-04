import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import ordersInfoDetailSstyles from "./ordersInfoDetails.module.css";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { formatDate } from "../../utils/utils";

const OrdersInfoDetails = ({ order }) => {
  const {
    orderInfo,
    orderId,
    container,
    listItem,
    info,
    price,
    text,
    border,
    itemImage,
    img,
    totalInfo,
  } = ordersInfoDetailSstyles;
  const { ingredientsRedux } = useSelector((store) => ({
    ingredientsRedux: store.ingredients.ingredients,
  }));

  const orderIngredientsData = useMemo(() => {
    return order.ingredients.map((id) => {
      return ingredientsRedux.find((item) => {
        return id === item._id;
      });
    });
  }, [ingredientsRedux, order]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData.reduce((sum, item) => {
      if (item.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, []);

  const count = (elem) => {
    let count = orderIngredientsData.filter((item) => {
      return item === elem;
    });
    return count.length;
  };

  return (
    <div className={orderInfo}>
      <p className={`${orderId} text text_type_digits-default mb-10`}>
        #{order.number}
      </p>
      <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
      {!!order.status && (
        <p className={`text text_type_main-default`}>
          {order.status === "done"
            ? "Выполнен"
            : order.status === "pending"
            ? "Готовится"
            : order.status === "created"
            ? "Создан"
            : "Выполнен"}
        </p>
      )}
      <p className="text text_type_main-medium mt-15 mb-4">Состав:</p>
      <ul className={container}>
        {orderIngredientsData &&
          [...new Set(orderIngredientsData)].map((item) => {
            const uniqueID = nanoid();
            return (
              <li className={`${listItem} pb-3`} key={uniqueID}>
                {item && (
                  <>
                    <div className={info}>
                      <div className={border}>
                        <div className={itemImage}>
                          <img
                            className={img}
                            src={item.image_mobile}
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <p className={`${text} text text_type_main-default pl-4`}>
                        {item.name}
                      </p>
                    </div>
                    <div className={price}>
                      <p className="text text_type_digits-default pr-2">
                        {" "}
                        {count(item)} x{" "}
                        {item.type === "bun" ? item.price * 2 : item.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </>
                )}
              </li>
            );
          })}
      </ul>
      <div className={`${totalInfo} text text_type_digits-default mt-10 mb-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </p>
        <p className={`${price} text text_type_digits-default mr-2`}>
          {orderTotalPrice}&ensp;
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrdersInfoDetails;
