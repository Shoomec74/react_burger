import React, { FC, useEffect } from "react";
import profileOrdersStyles from "./profileOrders.module.css";
import {
  useDispatch,
  useSelector,
} from "../../../services/actions-types/hooks";
import POSMonitor from "../../../components/POSMonitor/POSMonitor";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { getCookie } from "../../../services/utils";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../../utils/constants";

export const ProfileOrders: FC = () => {
  const { pageOrders } = profileOrdersStyles;
  const dispatch = useDispatch();
  const { isMessage } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
  }));
  const accessToken = getCookie("token");
  const wsUserOrdersEndpoint = `?token=${accessToken}`;

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: wsUserOrdersEndpoint });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return isMessage ? (
    <div className={pageOrders}>
      <POSMonitor />
    </div>
  ) : (
    <LoadingSpinner />
  );
};
