import { delay } from "../../utils/utils";
import { TIngredientResponse } from "../../types/data";
import {
  BASE_API_URL,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../../utils/constants";
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../actions-types";

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS;
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: TIngredientResponse;
  readonly success: boolean;
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly error: Error;
}

export type TActionBurgerIngredients =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

const getIngredients: AppThunk = () => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    //--Имитируем загузку реально большого приложения--//
    await delay(1000);
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
};

export default getIngredients;
