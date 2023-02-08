import { IIngredient, IOrder } from "../../types";
import * as ACTION_TYPES from "../../utils/constants";

// export function handleWievPopup(namePopup, payload) {
//   return {
//     type: namePopup,
//     payload: payload,
//   };
// }

export interface IOpenPopup {
  readonly type: typeof ACTION_TYPES.SHOW_MODAL;
  readonly typeModal: string;
  payload?: IIngredient | IOrder;
}

export interface IOpenPopupWithDetails {
  readonly type: typeof ACTION_TYPES.SHOW_MODAL_WITH_DETAILS;
}

export interface IClosePopup {
  readonly type: typeof ACTION_TYPES.HIDE_MODAL;
}

export type TActionModal =
  | IOpenPopup
  | IClosePopup;
