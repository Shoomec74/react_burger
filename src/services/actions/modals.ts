// import { IIngredient, IOrder } from "../../types";
// import { TFeed } from "../../types/data";
// import * as ACTION_TYPES from "../../utils/constants";

import { IIngredient, IOrder } from "../../types";

export enum ModalActionTypes {
  ShowModal,
  showModalIngredient,
  showModalOrder,
  HideModal,
}

export interface ModalAction {
  type: ModalActionTypes;
  payload?: any;
}

export function showModal(): ModalAction {
  return {
    type: ModalActionTypes.ShowModal,
  };
}

export function showModalIngredient(payload: IIngredient): ModalAction {
  return {
    type: ModalActionTypes.showModalIngredient,
    payload,
  };
}

export function showModalOrder(): ModalAction {
  return {
    type: ModalActionTypes.showModalOrder,
  };
}

export function hideModal(): ModalAction {
  return {
    type: ModalActionTypes.HideModal,
  };
}
