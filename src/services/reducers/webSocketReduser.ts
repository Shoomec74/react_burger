import { TFeed } from "../../types/data";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../../utils/constants";
import { TActionsWS } from "../actions/webSocket";

type TWSState = {
  wsConnected: boolean,
  orders: Array<TFeed>,
  total: number,
  totalToday: number,
  isMessage: boolean,
  feedConnected: boolean,
}

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  isMessage: false,
  feedConnected: false,
};

const wsReducer = (state = initialState, action: TActionsWS) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        feedConnected: action.whoIsConnected,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        isMessage: false,
        feedConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        isMessage: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};

export default wsReducer;
