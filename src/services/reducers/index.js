import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burgerIngredients";
import burgerConstructorReducer from "./burgerConstructor";
import orderDetailsReducer from "./orederDetails";
import modalsReducers from "./modals";

const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  constructor: burgerConstructorReducer,
  order: orderDetailsReducer,
  popup: modalsReducers,
});

export default rootReducer;
