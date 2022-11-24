import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burgerIngredients.js";
import burgerConstructorReducer from "./burgerConstructor.js";
import orderDetailsReducer from "./orederDetails.js";
import modalsReducer from "./modals.js";
import registerUserReduser from './register.js';
import {userInfoReduser} from './user.js';
import authorizationReducer from './authorization.js';
import resetPasswordReducer from './resetPassword.js';

const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  order: orderDetailsReducer,
  popup: modalsReducer,
  burgerConstructor: burgerConstructorReducer,
  registerUser: registerUserReduser,
  userInfo: userInfoReduser,
  authorization: authorizationReducer,
  resetPassword: resetPasswordReducer,
});

export default rootReducer;
