import { IIngredient } from "../../types";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../../utils/constants";
import { TActionBurgerIngredients } from "../actions/burgerIngredients";

type TBurgerIngredientsState = {
  success: boolean;
  ingredients: Array<IIngredient>;
  error: Error | null;
  isLoading: boolean;
};

const initialState: TBurgerIngredientsState = {
  success: false,
  ingredients: [],
  error: null,
  isLoading: false,
};

const burgerIngredientsReducer = (
  state = initialState,
  action: TActionBurgerIngredients
) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.data.data,
        isLoading: false,
        success: action.success,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default burgerIngredientsReducer;
