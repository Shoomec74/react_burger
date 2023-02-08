import { TIngredientResponse } from "../../types/data";
import {
  BASE_API_URL,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../../utils/constants";
import { request } from "../../utils/utils";

export interface IGetIngredients {
  readonly type:
    | typeof GET_INGREDIENTS
    | typeof GET_INGREDIENTS_SUCCESS
    | typeof GET_INGREDIENTS_FAILED;
  readonly data: TIngredientResponse;
  readonly success: boolean;
  readonly error: Error;
}

export type TActionBurgerIngredients = IGetIngredients;

function getIngredients(): (dispatch: any) => void {
  return function (dispatch): void {
    dispatch({
      type: GET_INGREDIENTS,
    });
    request(`${BASE_API_URL}/ingredients`)
      .then((res) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res,
          success: res.success,
        })
      )
      .catch((error) =>
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: error,
        })
      );
  };
}

export default getIngredients;
