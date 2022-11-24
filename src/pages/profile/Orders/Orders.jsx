import React from "react";
import ordersStyles from "./orders.module.css";
import { useLocation } from "react-router-dom";

export const Orders = () => {
  const location = useLocation();
  const { pageOrders } = ordersStyles;
  return (
    <div className={pageOrders}>
      <h2 className="text text_type_main-medium">
        Здесь будет Ваша история заказов
      </h2>
    </div>
  );
};
