import React, { FC, useEffect } from "react";
import orderInfoPageStyles from "./orderInfoPage.module.css";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import OrdersInfoDetails from "../../components/OrdersInfoDetails/OrdersInfoDetails";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useParams, useLocation } from "react-router-dom";
import { getCookie } from "../../services/utils";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../utils/constants";
import { TLocation } from "../../types";

export const OrderInfoPage: FC = () => {
  const { orderInfoPage } = orderInfoPageStyles;
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();
  const { id } = useParams<{id: string}>();
  const { isMessage, orders } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
    orders: store.webSocket.orders,
  }));
  const wsFeedEndpoint: string = "/all";
  const accessToken = getCookie("token");
  const wsUserOrdersEndpoint: string = `?token=${accessToken}`;

  const order = orders?.find(({ _id }) => id === _id);

  useEffect(() => {
    if (location.pathname.includes("/feed")) {
      dispatch({type: WS_CONNECTION_START, payload: wsFeedEndpoint});
    } else {
      dispatch({type: WS_CONNECTION_START, payload: wsUserOrdersEndpoint});
    }

    return () => {
      dispatch({type: WS_CONNECTION_CLOSED});
    };
  }, [dispatch, accessToken]);

  return isMessage && order ? (
    <div className={orderInfoPage}>
      <OrdersInfoDetails order={order} />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
