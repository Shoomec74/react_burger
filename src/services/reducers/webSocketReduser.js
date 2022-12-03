import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../../utils/constants.js";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  isMessage: false,
  feedConnected: false,
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        feedConnected: action.payload.whoIsConnected,
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
