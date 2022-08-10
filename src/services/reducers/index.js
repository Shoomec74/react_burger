import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burgerIngredients";
import burgerConstructorReducer from "./butgerConstructor";

const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  order: burgerConstructorReducer,
});

export default rootReducer;
