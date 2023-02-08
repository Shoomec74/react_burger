import { TUser } from "../../types/index";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FALED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FALED,
} from "../../utils/constants";
import { TActionAuthorization } from "../actions/authorization";

type TAuthorizationState = {
  isLoading: boolean;
  isLogin: boolean;
  user: TUser;
  error: Error | null;
};

const initialState: TAuthorizationState = {
  isLoading: false,
  isLogin: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  error: null,
};

const authorizationReducer = (state = initialState, action: TActionAuthorization) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isLogin: true,
        isLoading: false,
      };
    }
    case LOGIN_USER_FALED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return initialState;
    }
    case LOGOUT_USER_FALED: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default authorizationReducer;
