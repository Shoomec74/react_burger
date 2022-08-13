import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../../utils/constants.js";

const initialState = {
  success: false,
  ingredients: [],
  error: null,
  isLoading: false,
};

const burgerIngredientsReducer = (state = initialState, action) => {
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
