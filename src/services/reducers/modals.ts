import { IIngredient } from "../../types";
import { TFeed } from "../../types/data";
import { ModalAction, ModalActionTypes } from "../actions/modals";

type TModalState = {
  ingredient: null | IIngredient;
  feedItem: null | TFeed;
  feedModal: boolean;
  modalDisplay: boolean;
  modalIngredient: boolean;
  modalOrder: boolean;
};

const initialState: TModalState = {
  ingredient: null,
  feedItem: null,
  feedModal: false,
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
    case ModalActionTypes.showModalFeed: {
      return {
        ...state,
        feedItem: action.payload,
        feedModal: true,
      };
    }
    case ModalActionTypes.showModalOrder: {
      return {
        ...state,
        modalOrder: true,
      };
    }
    case ModalActionTypes.HideModal:
      return {
        ...state,
        ingredient: null,
        feedItem: null,
        feedModal: false,
        modalDisplay: false,
        modalIngredient: false,
        modalOrder: false,
      };
    default:
      return state;
  }
};

export default modalsReducer;
