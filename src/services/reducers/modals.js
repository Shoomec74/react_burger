import { INGREDIENT_MODAL, ORDER_MODAL } from "../../utils/constants.js";

const initialState = {
  ingredientModal: false,
  orderModal: false,
  ingredient: null,
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModal: !state.ingredientModal,
        ingredient: action.payload,
      };
    }
    case ORDER_MODAL: {
      return {
        ...state,
        orderModal: !state.orderModal,
      };
    }
    default:
      return state;
  }
};

export default modalsReducer;
