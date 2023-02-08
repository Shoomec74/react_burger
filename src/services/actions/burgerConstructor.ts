import * as ACTION_TYPES from "../../utils/constants";
import { IDNDIngredient, IIngredient } from "../../types";

export interface IAddBun {
  readonly type: typeof ACTION_TYPES.ADD_BUN;
  readonly payLoad: IDNDIngredient;
}

export interface IAddIngredient {
  readonly type: typeof ACTION_TYPES.ADD_INGREDIENT;
  readonly payLoad: IDNDIngredient;
}

export interface IRemoveIngredient {
  readonly type: typeof ACTION_TYPES.REMOVE_INGREDIENT;
  readonly payLoad: string;
}

export interface ISwapIngredient {
  readonly type: typeof ACTION_TYPES.SWAP_INGREDIENT;
  readonly payLoad: { hoverIndex: number; dragIndex: number };
}

export interface IRefreshConstructor {
  readonly type: typeof ACTION_TYPES.REFRESH_CONSTRUCTOR;
}

export type TActionsBurgerConstructor =
  | IAddBun
  | IAddIngredient
  | IRemoveIngredient
  | ISwapIngredient
  | IRefreshConstructor;
