import {
  INGREDIENT_MODAL,
  ORDER_MODAL,
  FEED_MODAL,
  PROFILE_MODAL,
} from "../../utils/constants.js";

const initialState = {
  ingredientModal: false,
  orderModal: false,
  ingredient: null,
  order: null,
  feedModal: false,
  profileModal: false,
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
    case FEED_MODAL: {
      return {
        ...state,
        feedModal: !state.feedModal,
        order: action.payload,
      };
    }
    case PROFILE_MODAL: {
      return {
        ...state,
        profileModal: !state.profileModal,
        order: action.payload,
      };
    }
    default:
      return state;
  }
};

export default modalsReducer;
