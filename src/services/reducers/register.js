import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FALED,
  SET_REGISTER_FORM_VALUE,
} from "../../utils/constants.js";

const initialState = {
  isRegisterUser: false,
  isLoading: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  form: {
    name: "",
    email: "",
    password: "",
  },
  error: null,
};

const registerUserReduser = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isRegisterUser: true,
        user: action.user,
        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },
        isLoading: false,
      };
    }
    case REGISTER_USER_FALED: {
      return {
        ...state,
        registerFailed: true,
        error: action.error,
        isLoading: false,
      };
    }
    case SET_REGISTER_FORM_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.fieldForm]: action.valueFieldForm,
        },
      };
    }
    default:
      return state;
  }
};

export default registerUserReduser;
