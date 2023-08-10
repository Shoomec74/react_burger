import React, { FC, useEffect } from "react";
import feedStyles from "./feed.module.css";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import * as ACTION_TYPES from "../../utils/constants";
import POSMonitor from "../../components/POSMonitor/POSMonitor";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export const Feed: FC = () => {
  const { feedPage } = feedStyles;
  const dispatch = useDispatch();
  const wsFeedEndpoint = "/all";
  const { isMessage } = useSelector((store: any) => ({
    isMessage: store.webSocket.isMessage,
  }));

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.WS_CONNECTION_START,
      payload: wsFeedEndpoint,
    });
    return () => {
      dispatch({ type: ACTION_TYPES.WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return isMessage ? (
    <div className={feedPage}>
      <POSMonitor />
    </div>
  ) : (
    <LoadingSpinner />
  );
};
