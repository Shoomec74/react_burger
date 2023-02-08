import { TFeedResponse } from "../../types/data";
import * as ACTION_TYPES from "../../utils/constants";

export interface IWSConnectionSuccess {
  readonly type: typeof ACTION_TYPES.WS_CONNECTION_SUCCESS;
  whoIsConnected: boolean;
}

export interface IWSConnectionOpen {
  readonly type: typeof ACTION_TYPES.WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionError {
  readonly type: typeof ACTION_TYPES.WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosed {
  readonly type: typeof ACTION_TYPES.WS_CONNECTION_CLOSED;
}

export interface IWSGetMessage {
  readonly type: typeof ACTION_TYPES.WS_GET_ORDERS;
  readonly payload: TFeedResponse;
}

export interface IWSSendMessage {
  readonly type: typeof ACTION_TYPES.WS_SEND_MESSAGE;
  readonly payload: TFeedResponse;
}

export type TActionsWS =
  | IWSConnectionSuccess
  | IWSConnectionOpen
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage
  | IWSSendMessage;
