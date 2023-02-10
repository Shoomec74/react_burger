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
}

export interface IOpenPopupWithDetailsFeed {
  readonly type: typeof ACTION_TYPES.SHOW_MODAL_WITH_DETAILS_FEED;
  readonly payload: IOrder;
}

export interface IOpenPopupWithDetailsIngredient {
  readonly type: typeof ACTION_TYPES.SHOW_MODAL_WITH_DETAILS_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IClosePopup {
  readonly type: typeof ACTION_TYPES.HIDE_MODAL;
}

export type TActionModal =
  | IOpenPopup
  | IOpenPopupWithDetailsFeed
  | IOpenPopupWithDetailsIngredient
  | IClosePopup;
