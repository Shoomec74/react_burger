import {
  BASE_API_URL,
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
} from "../../utils/constants";
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../actions-types";
import { useDispatch } from "../actions-types/hooks";
import { getCookie } from "../utils";

export type TBurgerInbgredientsId = {
  readonly ingredients: Array<string>;
};

interface IPostOrder {
  readonly type: typeof POST_ORDER;
}

interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly order: number;
  readonly name: string;
  readonly success: boolean;
}

interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
  readonly error: Error;
}

export type TActionOrederDetails =
  | IPostOrder
  | IPostOrderSuccess
  | IPostOrderFailed;

const postOrder: AppThunk = (burgerIds: TBurgerInbgredientsId) => {
  return function (dispatch: AppDispatch): void {
    dispatch({ type: POST_ORDER });
    request(`${BASE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(burgerIds),
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
};

export default postOrder;
