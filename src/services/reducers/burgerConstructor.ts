import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENT,
  REFRESH_CONSTRUCTOR,
} from "../../utils/constants";
import { IDNDIngredient } from "../../types";
import { TActionsBurgerConstructor } from "../actions/burgerConstructor";

type TBurgerConstructorState = {
    bun: Array<IDNDIngredient>;
    filling: Array<IDNDIngredient>;
}

const initialState: TBurgerConstructorState = {
  bun: [],
  filling: [],
};

const burgerConstructorReducer = (state = initialState, action: TActionsBurgerConstructor) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: [action.payload],
      };
    }
    case ADD_INGREDIENT: {
      return { ...state, filling: [...state.filling, action.payload] };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        filling: [...state.filling].filter(
          (item: IDNDIngredient) => item.uniqueID !== action.payload
        ),
      };
    }
    case SWAP_INGREDIENT: {
      const newState = [...state.filling];
      newState.splice(
        action.payload.dragIndex,
        0,
        newState.splice(action.payload.hoverIndex, 1)[0]
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
