import { IIngredient, IOrder } from "../../types";
import { HIDE_MODAL, SHOW_MODAL, SHOW_MODAL_WITH_DETAILS_FEED, SHOW_MODAL_WITH_DETAILS_INGREDIENT } from "../../utils/constants";
import { TActionModal } from "../actions/modals";

type TModalState = {
  ingredient: null | IIngredient;
  order: null | IOrder;
  modalDisplay: boolean;
};

const initialState: TModalState = {
  ingredient: null,
  order: null,
  modalDisplay: false,
};

const modalsReducer = (state = initialState, action: TActionModal) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        modalDisplay: !state.modalDisplay,
      };
    }
    case SHOW_MODAL_WITH_DETAILS_FEED: {
      return {
        ...state,
        modalDisplay: !state.modalDisplay,
        order: action.payload,
      }
    }
    case SHOW_MODAL_WITH_DETAILS_INGREDIENT: {
      return{
        ...state,
        modalDisplay: !state.modalDisplay,
        ingredient: action.payload,
      }
    }
    case HIDE_MODAL: {
      return state;
    }
    default:
      return state;
  }
};

export default modalsReducer;
