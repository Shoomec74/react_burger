import {
  FORGOT_USER_PASSWORD_REQUEST,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_FALED,
  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FALED,
} from "../../utils/constants.js";

const initialState = {
  isLoading: false,
  isPasswordRecovery: false,
  isPasswordRelevant: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  error: null,
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_USER_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FORGOT_USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordRecovery: action.isUserRegistered,
        isPasswordRelevant: false,
        isLoading: false,
      };
    }
    case FORGOT_USER_PASSWORD_FALED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case RESET_USER_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case RESET_USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordRelevant: action.isPasswordRelevant,
        isPasswordRecovery: false,
        isLoading: false,
      };
    }
    case RESET_USER_PASSWORD_FALED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

export default resetPasswordReducer;
