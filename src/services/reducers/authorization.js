import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FALED,
  SET_LOGIN_FORM_VALUE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FALED,
} from "../../utils/constants.js";

const initialState = {
  isLoading: false,
  isLogin: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  form: {
    email: "",
    password: "",
  },
  error: null,
};

const authorizationReducer = (state = initialState, action) => {
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
        form: {
          ...state.form,
          email: "",
          password: "",
        },
        error: action.error,
        isLoading: false,
      };
    }
    case SET_LOGIN_FORM_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.fieldForm]: action.valueFieldForm,
        },
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
