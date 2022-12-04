import React, { useEffect } from "react";
import profileOrdersStyles from "./profileOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionOpen,
  wsConnectionClosed,
} from "../../../services/actions/webSocket";
import POSMonitor from "../../../components/POSMonitor/POSMonitor";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { getCookie } from "../../../services/utils";

export const ProfileOrders = () => {
  const { pageOrders } = profileOrdersStyles;
  const dispatch = useDispatch();
  const { isMessage } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
  }));
  const accessToken = getCookie("token");
  const wsUserOrdersEndpoint = `?token=${accessToken}`;

  useEffect(() => {
    dispatch(wsConnectionOpen(wsUserOrdersEndpoint));
    return () => {
      dispatch(wsConnectionClosed());
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
