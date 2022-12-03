import React, { useEffect } from "react";
import orderInfoPageStyles from "./orderInfoPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsFeedConnectionOpen,
  wsConnectionClosed,
} from "../../services/actions/webSocket";
import OrdersInfoDetails from "../../components/OrdersInfoDetails/OrdersInfoDetails";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useParams, useLocation } from "react-router-dom";

export function OrderInfoPage() {
  const { orderInfoPage } = orderInfoPageStyles;
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { isMessage, orders } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
    orders: store.webSocket.orders,
  }));

  const order = orders?.find(({ _id }) => id === _id);
  console.log(location);

  useEffect(() => {
    if (location.pathname.includes("feed")) {
      dispatch(wsFeedConnectionOpen());
      return () => {
        dispatch(wsConnectionClosed());
      };
    }
  }, [dispatch]);

  return isMessage ? (
    <div className={orderInfoPage}>
      <OrdersInfoDetails order={order} />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
