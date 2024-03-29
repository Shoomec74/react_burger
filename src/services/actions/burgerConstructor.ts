import * as ACTION_TYPES from "../../utils/constants";
import { IDNDIngredient, IIngredient } from "../../types";

interface IAddBun {
  readonly type: typeof ACTION_TYPES.ADD_BUN;
  readonly payload: IDNDIngredient;
}

interface IAddIngredient {
  readonly type: typeof ACTION_TYPES.ADD_INGREDIENT;
  readonly payload: IDNDIngredient;
}

interface IRemoveIngredient {
  readonly type: typeof ACTION_TYPES.REMOVE_INGREDIENT;
  readonly payload: string;
}

interface ISwapIngredient {
  readonly type: typeof ACTION_TYPES.SWAP_INGREDIENT;
  readonly payload: { hoverIndex: number; dragIndex: number };
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
