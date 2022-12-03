import React, { useEffect } from "react";
import profileOrdersStyles from "./profileOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsMyOrdersConnectionOpen,
  wsConnectionClosed,
} from "../../../services/actions/webSocket";
import POSMonitor from "../../../components/POSMonitor/POSMonitor";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export const ProfileOrders = () => {
  const { pageOrders } = profileOrdersStyles;
  const dispatch = useDispatch();
  const { isMessage } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
  }));

  useEffect(() => {
    dispatch(wsMyOrdersConnectionOpen());
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
