import {
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
} from "../../utils/constants";
import { TActionOrederDetails } from "../actions/orederDetails";

type TOrederDetailsState = {
  success: boolean;
  error: null | Error;
  isLoading: boolean;
  name: string;
  order: number;
};

const initialState: TOrederDetailsState = {
  success: false,
  error: null,
  isLoading: false,
  name: "",
  order: 0,
};

const orderDetailsReducer = (state = initialState, action: TActionOrederDetails) => {
  switch (action.type) {
    case POST_ORDER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        success: action.success,
        name: action.name,
        order: action.order,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderDetailsReducer;
