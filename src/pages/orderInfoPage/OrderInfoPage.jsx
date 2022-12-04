import React, { useEffect } from "react";
import orderInfoPageStyles from "./orderInfoPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionOpen,
  wsConnectionClosed,
} from "../../services/actions/webSocket";
import OrdersInfoDetails from "../../components/OrdersInfoDetails/OrdersInfoDetails";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useParams, useLocation } from "react-router-dom";
import { getCookie } from "../../services/utils";

export function OrderInfoPage() {
  const { orderInfoPage } = orderInfoPageStyles;
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { isMessage, orders } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
    orders: store.webSocket.orders,
  }));
  const wsFeedEndpoint = "/all";
  const accessToken = getCookie("token");
  const wsUserOrdersEndpoint = `?token=${accessToken}`;

  const order = orders?.find(({ _id }) => id === _id);

  useEffect(() => {
    if (location.pathname.includes("/feed")) {
      dispatch(wsConnectionOpen(wsFeedEndpoint));
    } else {
      dispatch(wsConnectionOpen(wsUserOrdersEndpoint));
    }

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, accessToken]);

  return isMessage ? (
    <div className={orderInfoPage}>
      <OrdersInfoDetails order={order} />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
