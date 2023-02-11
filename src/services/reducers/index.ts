import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burgerIngredients";
import burgerConstructorReducer from "./burgerConstructor";
import orderDetailsReducer from "./orederDetails";
import registerUserReduser from "./register";
import userInfoReduser from "./user";
import authorizationReducer from "./authorization";
import resetPasswordReducer from "./resetPassword";
import wsReducer from "./webSocketReduser";
import modalsReducer from "./modals";

const rootReducer = combineReducers({
  authorization: authorizationReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: burgerIngredientsReducer,
  popup: modalsReducer,
  order: orderDetailsReducer,
  registerUser: registerUserReduser,
  resetPassword: resetPasswordReducer,
  userInfo: userInfoReduser,
  webSocket: wsReducer,
});

export default rootReducer;
