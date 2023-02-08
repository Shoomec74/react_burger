import { getCookie } from "../utils";
import { Middleware, MiddlewareAPI } from "redux";
import { TSocketMiddlewareActions } from "../../types";

export const socketMiddleware = (wsUrl: string, wsActions: TSocketMiddlewareActions): Middleware => {
  const accessToken = getCookie("token");
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =  wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: {
              event: event,
              // whoIsConnected: event.currentTarget.url.includes("all")
              //   ? true
              //   : false,
              whoIsConnected: document.URL.includes("all")
                ? true
                : false,
            },
          });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: accessToken };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
