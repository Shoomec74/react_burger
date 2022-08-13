import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burgerIngredients.js";
import burgerConstructorReducer from "./burgerConstructor.js";
import orderDetailsReducer from "./orederDetails.js";
import modalsReducer from "./modals.js";

const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  order: orderDetailsReducer,
  popup: modalsReducer,
  burgerConstructor: burgerConstructorReducer,
});

export default rootReducer;
