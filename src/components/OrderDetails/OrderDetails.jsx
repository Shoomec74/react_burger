import React from "react";
import orderDetailsStyles from "./orderDetails.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function OrderDetails({order, name}) {
  const {popup, gradientItem, gradientItemTwo, status, icon} = orderDetailsStyles;
  return (
    <div className={popup}>
      <h2 className="text text_type_digits-large mt-30 mr-25 ml-25">{order}</h2>
      <h3 className="text text_type_main-medium mt-8 mb-15 mr-25 ml-25">идентификатор заказа</h3>
      <div className={`${status} mb-15`}>
        <div className={gradientItem}></div>
        <div className={gradientItemTwo}></div>
        <div className={icon}>
        <CheckMarkIcon type="primary" />
        </div>
      </div>
      <p className="text text_type_main-default mr-25 ml-25">{name}</p>
      <p className="text text_type_main-default text_color_inactive mb-30 mt-2 mr-25 ml-25">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderData: PropTypes.object
}

export default OrderDetails;
