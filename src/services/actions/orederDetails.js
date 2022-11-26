import {
  BASE_API_URL,
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
} from "../../utils/constants.js";
import { request } from "../../utils/utils.js";

function postOrder(burgerId) {
  return function (dispatch) {
    dispatch({ type: POST_ORDER });
    request(`${BASE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(burgerId),
    })
      .then((data) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: data.order.number,
          name: data.name,
          success: data.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_ORDER_FAILED,
          error: error,
        });
      });
  };
}
export default postOrder;
