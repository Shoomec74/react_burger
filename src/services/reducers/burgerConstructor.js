import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENT,
  REFRESH_CONSTRUCTOR,
} from "../../utils/constants.js";

const initialState = {
  bun: [],
  filling: [],
};

const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payLoad,
      };
    }
    case ADD_INGREDIENT: {
      return { ...state, filling: [...state.filling, action.payLoad] };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        filling: [...state.filling].filter(
          (item) => item.uniqueID !== action.payLoad
        ),
      };
    }
    case SWAP_INGREDIENT: {
      const newState = [...state.filling];
      newState.splice(
        action.payLoad.dragIndex,
        0,
        newState.splice(action.payLoad.hoverIndex, 1)[0]
      );
      return {
        ...state,
        filling: newState,
      };
    }
    case REFRESH_CONSTRUCTOR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default burgerConstructorReducer;