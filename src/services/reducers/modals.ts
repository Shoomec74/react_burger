import { IIngredient, IOrder } from "../../types";
import { HIDE_MODAL, SHOW_MODAL } from "../../utils/constants";
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
      if (action.typeModal === "ingredientModal") {
        return {
          ...state,
          modalDisplay: !state.modalDisplay,
          ingredient: action.payload,
        };
      } else if (action.typeModal === "orderModal") {
        return {
          ...state,
          modalDisplay: !state.modalDisplay,
          order: action.payload,
        };
      }
      return {
        ...state,
        modalDisplay: !state.modalDisplay,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modalDisplay: !state.modalDisplay,
      };
    }
    default:
      return state;
  }
};

export default modalsReducer;
