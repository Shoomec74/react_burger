import { getCookie } from "../utils.ts";

export const socketMiddleware = (wsUrl, wsActions) => {
  const accessToken = getCookie("token");
  return (store) => {
    let socket = null;
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
              whoIsConnected: event.currentTarget.url.includes("all")
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
