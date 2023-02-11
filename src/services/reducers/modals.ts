import { IIngredient, IOrder } from "../../types";
import {
  HIDE_MODAL,
  SHOW_MODAL,
  SHOW_MODAL_WITH_DETAILS_FEED,
  SHOW_MODAL_WITH_DETAILS_INGREDIENT,
} from "../../utils/constants";
import { ModalAction, ModalActionTypes } from "../actions/modals";

type TModalState = {
  ingredient: null | IIngredient;
  order: null | IOrder;
  modalDisplay: boolean;
  modalIngredient: boolean;
  modalOrder: boolean;
};

const initialState: TModalState = {
  ingredient: null,
  order: null,
  modalDisplay: false,
  modalIngredient: false,
  modalOrder: false,
};

const modalsReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalActionTypes.ShowModal:
      return {
        ...state,
        modalDisplay: true,
      };
    case ModalActionTypes.showModalIngredient:
      return {
        ...state,
        modalIngredient: true,
        ingredient: action.payload,
      };

      case ModalActionTypes.showModalOrder: {
        return {
          ...state,
          modalOrder: true,
        }
      }
    case ModalActionTypes.HideModal:
      return {
        ...state,
        ingredient: null,
        order: null,
        modalDisplay: false,
        modalIngredient: false,
        modalOrder: false,
      };
    default:
      return state;
  }
};

export default modalsReducer;
