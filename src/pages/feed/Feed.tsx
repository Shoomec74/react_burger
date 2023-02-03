import React, { useEffect } from "react";
import feedStyles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionOpen,
  wsConnectionClosed,
} from "../../services/actions/webSocket";
import POSMonitor from "../../components/POSMonitor/POSMonitor";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export const Feed: React.FC = () =>{
  const { feedPage } = feedStyles;
  const dispatch = useDispatch();
  const wsFeedEndpoint = "/all";
  const { isMessage } = useSelector((store: any) => ({
    isMessage: store.webSocket.isMessage,
  }));

  useEffect(() => {
    dispatch(wsConnectionOpen(wsFeedEndpoint));
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
