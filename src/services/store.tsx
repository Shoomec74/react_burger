import React from "react";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import rootReducer from "./reducers/index";
import { socketMiddleware } from "./middleware/socketMiddleware";
import thunk from "redux-thunk";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  WS_GET_ORDERS,
} from "../utils/constants";
import { TSocketMiddlewareActions } from "../types";

const wsUrl: string = "wss://norma.nomoreparties.space/orders";

const wsActions: TSocketMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);
const store = createStore(rootReducer, enhancer);

export default store;
