import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burgerIngredients";
import burgerConstructorReducer from "./burgerConstructor";
import orderDetailsReducer from "./orederDetails";
import registerUserReduser from './register';
import userInfoReduser from './user';
import authorizationReducer from './authorization';
import resetPasswordReducer from './resetPassword';
import wsReducer from "./webSocketReduser";
import modalsReducer from "./modals";

const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  order: orderDetailsReducer,
  popup: modalsReducer,
  burgerConstructor: burgerConstructorReducer,
  registerUser: registerUserReduser,
  userInfo: userInfoReduser,
  authorization: authorizationReducer,
  resetPassword: resetPasswordReducer,
  webSocket: wsReducer,
});

export default rootReducer;
