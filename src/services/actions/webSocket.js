import {
  WS_FEED_CONNECTION_START,
  WS_ORDERS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../../utils/constants.js";

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsFeedConnectionOpen = () => {
  return {
    type: WS_FEED_CONNECTION_START,
  };
};

export const wsMyOrdersConnectionOpen = () => {
  return {
    type: WS_ORDERS_CONNECTION_START,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (order) => {
  return {
    type: WS_GET_ORDERS,
    payload: order,
  };
};
