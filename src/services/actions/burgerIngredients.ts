import {
  BASE_API_URL,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../../utils/constants";
import { request } from "../../utils/utils";
import { IGetIngredients } from "../types";

function getIngredients(): (dispatch: any) => void {
  return function (dispatch) : void {
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
