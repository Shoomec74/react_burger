//-- Базовый эндпоинт к серверу --//
export const BASE_API_URL: string = "https://norma.nomoreparties.space/api";

//-- Базовый эндпоинт к серверу для авторизации --//
export const BASE_API_AUTH: string = `${BASE_API_URL}/auth`;

//-- actions для компонента BurgerIngredients --//
export const GET_INGREDIENTS: string = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED: string = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS: string = "GET_INGREDIENTS_SUCCESS";

//-- actions для компонента OrderDetails --//
export const POST_ORDER: string = "POST_ORDER";
export const POST_ORDER_FAILED: string = "POST_ORDER_FAILED";
export const POST_ORDER_SUCCESS: string = "POST_ORDER_SUCCESS";

//-- actions для компонента Modal --//
export const INGREDIENT_MODAL: string = "INGREDIENT_MODAL";
export const ORDER_MODAL: string = "ORDER_MODAL";
export const FEED_MODAL: string = "FEED_MODAL";
export const PROFILE_MODAL: string = "PROFILE_MODAL";

//-- actions для компонента BuregerConstructor --//
export const ADD_BUN: string = "ADD_BUN";
export const ADD_INGREDIENT: string = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: string = "REMOVE_INGREDIENT";
export const SWAP_INGREDIENT: string = "SWAP_INGREDIENT";
export const REFRESH_CONSTRUCTOR: string = "REFRESH_CONSTRUCTOR";

//-- actions для страницы регистрации --//
export const REGISTER_USER_REQUEST: string = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: string = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FALED: string = "REGISTER_USER_FALED";

//-- actions для получения данных о пользователе --//
export const GET_USER_INFO_REQUEST: string = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS: string = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FALED: string = "GET_USER_INFO_FALED";
export const UPDATE_USER_TOKEN_REQUEST: string = "UPDATE_USER_TOKEN_REQUEST";
export const UPDATE_USER_TOKEN_SUCCES: string = "UPDATE_USER_TOKEN_SUCCES";
export const UPDATE_USER_TOKEN_FALED: string = "UPDATE_USER_TOKEN_FALED";
export const UPDATE_USER_INFO_REQUEST: string = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS: string = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FALED: string = "UPDATE_USER_INFO_FALED";

//-- actions для страницы логина --//
export const LOGIN_USER_REQUEST: string = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: string = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FALED: string = "LOGIN_USER_FALED";
export const LOGOUT_USER_REQUEST: string = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS: string = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FALED: string = "LOGOUT_USER_FALED";

//-- actions для страницы запроса восстановления пароля --//
export const FORGOT_USER_PASSWORD_REQUEST: string = "FORGOT_USER_PASSWORD_REQUEST";
export const FORGOT_USER_PASSWORD_SUCCESS: string = "FORGOT_USER_PASSWORD_SUCCESS";
export const FORGOT_USER_PASSWORD_FALED: string = "FORGOT_USER_PASSWORD_FALED";

//-- actions для страницы сброса пароля --//
export const RESET_USER_PASSWORD_REQUEST: string = "RESET_USER_PASSWORD_REQUEST";
export const RESET_USER_PASSWORD_SUCCESS: string = "RESET_USER_PASSWORD_SUCCESS";
export const RESET_USER_PASSWORD_FALED: string = "RESET_USER_PASSWORD_FALED";

//-- actions для WebSocket --//
export const WS_CONNECTION_START: string = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: string = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: string = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: string = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: string = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: string = "WS_SEND_MESSAGE";
export const WS_GET_ORDERS: string = "WS_GET_ORDERS";
