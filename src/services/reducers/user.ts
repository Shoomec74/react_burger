import { TUser } from "../../types";
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FALED,
  UPDATE_USER_TOKEN_REQUEST,
  UPDATE_USER_TOKEN_SUCCES,
  UPDATE_USER_TOKEN_FALED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FALED,
} from "../../utils/constants";
import { TActionUser } from "../actions/user";

type TUserState = {
  isPasswordRelevant: boolean;
  isUserRegistered: boolean;
  registerFailed: boolean;
  registerRequest: boolean;
  isLoading: boolean;
  isJwtExpired: boolean;
  user: TUser;
  error: null | Error;
};

const initialState: TUserState = {
  isPasswordRelevant: false,
  isUserRegistered: false,
  registerFailed: true,
  registerRequest: false,
  isLoading: false,
  isJwtExpired: false,
  user: {
    name: "Jon",
    email: "",
    password: "",
  },
  error: null,
};

const userInfoReduser = (state = initialState, action: TActionUser) => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        isLogin: action.response.success,
        user: {
          ...state.user,
          name: action.response.user.name,
          email: action.response.user.email,
          password: "",
        },
        isLoading: false,
        isJwtExpired: false,
      };
    }
    case GET_USER_INFO_FALED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isJwtExpired: true,
      };
    }
    case UPDATE_USER_TOKEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_TOKEN_SUCCES: {
      return {
        ...state,
        isJwtExpired: false,
        isLoading: false,
      };
    }
    case UPDATE_USER_TOKEN_FALED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isJwtExpired: true,
      };
    }
    case UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.user.name,
          email: action.user.user.email,
        },
        isLoading: false,
      };
    }
    case UPDATE_USER_INFO_FALED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default userInfoReduser;
