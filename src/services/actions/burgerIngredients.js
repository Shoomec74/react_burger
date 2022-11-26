import {
  BASE_API_URL,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../../utils/constants.js";
import { request } from "../../utils/utils.js";

function getIngredients() {
  return function (dispatch) {
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
