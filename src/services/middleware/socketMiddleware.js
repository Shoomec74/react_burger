import { getCookie } from "../utils";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { feed, orders } = wsUrl;
      const accessToken = getCookie("token");
      const {
        wsFeedInit,
        wsOrdersInit,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsFeedInit) {
        socket = new WebSocket(`${feed}`);
      } else if (type === wsOrdersInit) {
        socket = new WebSocket(`${orders}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: {
              event: event,
              whoIsConnected: type === wsFeedInit ? true : false,
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
          const message = { ...payload, token: getCookie("token") };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
