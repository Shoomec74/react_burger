import React, { useEffect } from "react";
import feedStyles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsFeedConnectionOpen,
  wsConnectionClosed,
} from "../../services/actions/webSocket";
import POSMonitor from "../../components/POSMonitor/POSMonitor";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export function Feed() {
  const { feedPage } = feedStyles;
  const dispatch = useDispatch();
  const { isMessage } = useSelector((store) => ({
    isMessage: store.webSocket.isMessage,
  }));

  useEffect(() => {
    dispatch(wsFeedConnectionOpen());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return isMessage ? (
    <div className={feedPage}>
      <POSMonitor />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
