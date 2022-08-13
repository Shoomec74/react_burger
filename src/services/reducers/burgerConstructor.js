import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENT,
} from "../../utils/constants.js";

const initialState = {
  bun: [],
  filling: [],
};

const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      console.log(action, state);
      return {
        ...state,
        bun: action.payLoad,
      };
    }
    case ADD_INGREDIENT: {
      console.log(action, state);
      return { ...state, filling: [...state.filling, action.payLoad] };
    }
    case REMOVE_INGREDIENT: {
      console.log(action)
      return {
        ...state,
        filling: [...state.filling].filter(
          (item) => item.uniqueID !== action.payLoad
        ),
      };
    }
    case SWAP_INGREDIENT: {
      console.log(action)
      const newState = [...state.filling];
      const prevIngredient = newState.splice(
        action.payLoad.hoverIndex,
        1,
        action.payLoad.ingredient
      );
      newState.splice(action.payLoad.dragIndex, 1, prevIngredient[0]);
      return {
        ...state,
        filling: newState,
      };
    }
    default: {
      return state;
    }
  }
};

export default burgerConstructorReducer;
