//-- Базовый эндпоинт к серверу --//
export const BASE_API_URL = "https://norma.nomoreparties.space/api";

//-- Базовый эндпоинт к серверу для авторизации --//
export const BASE_API_AUTH = `${BASE_API_URL}/auth`;

//-- actions для компонента BurgerIngredients --//
export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

//-- actions для компонента OrderDetails --//
export const POST_ORDER = "POST_ORDER";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";

//-- actions для компонента Modal --//
export const INGREDIENT_MODAL = "INGREDIENT_MODAL";
export const ORDER_MODAL = "ORDER_MODAL";
export const FEED_MODAL = "FEED_MODAL";
export const PROFILE_MODAL = "PROFILE_MODAL";

//-- actions для компонента BuregerConstructor --//
export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SWAP_INGREDIENT = "SWAP_INGREDIENT";
export const REFRESH_CONSTRUCTOR = "REFRESH_CONSTRUCTOR";

//-- actions для страницы регистрации --//
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FALED = "REGISTER_USER_FALED";

//-- actions для получения данных о пользователе --//
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FALED = "GET_USER_INFO_FALED";
export const UPDATE_USER_TOKEN_REQUEST = "UPDATE_USER_TOKEN_REQUEST";
export const UPDATE_USER_TOKEN_SUCCES = "UPDATE_USER_TOKEN_SUCCES";
export const UPDATE_USER_TOKEN_FALED = "UPDATE_USER_TOKEN_FALED";
export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FALED = "UPDATE_USER_INFO_FALED";

//-- actions для страницы логина --//
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FALED = "LOGIN_USER_FALED";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FALED = "LOGOUT_USER_FALED";

//-- actions для страницы запроса восстановления пароля --//
export const FORGOT_USER_PASSWORD_REQUEST = "FORGOT_USER_PASSWORD_REQUEST";
export const FORGOT_USER_PASSWORD_SUCCESS = "FORGOT_USER_PASSWORD_SUCCESS";
export const FORGOT_USER_PASSWORD_FALED = "FORGOT_USER_PASSWORD_FALED";

//-- actions для страницы сброса пароля --//
export const RESET_USER_PASSWORD_REQUEST = "RESET_USER_PASSWORD_REQUEST";
export const RESET_USER_PASSWORD_SUCCESS = "RESET_USER_PASSWORD_SUCCESS";
export const RESET_USER_PASSWORD_FALED = "RESET_USER_PASSWORD_FALED";

//-- actions для WebSocket --//
export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_GET_ORDERS = "WS_GET_ORDERS";
