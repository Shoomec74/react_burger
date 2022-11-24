import {
  BASE_API_URL,
  FORGOT_USER_PASSWORD_REQUEST,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_FALED,
  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FALED,
  SET_RESET_FORM_VALUE,
} from "../../utils/constants.js";
import { checkResponse } from "../../utils/utils.js";

const setResetFormValue = (fieldForm, valueFieldForm) => ({
  type: SET_RESET_FORM_VALUE,
  fieldForm,
  valueFieldForm,
});

const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_USER_PASSWORD_REQUEST,
    });
    fetch(`${BASE_API_URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: FORGOT_USER_PASSWORD_SUCCESS,
          isUserRegistered: res.success,
        });
      })
      .catch((error) =>
        dispatch({
          type: FORGOT_USER_PASSWORD_FALED,
          error: error,
        })
      );
  };
};

const resetPassword = (password, token) => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_PASSWORD_REQUEST,
    });
    fetch(`${BASE_API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: RESET_USER_PASSWORD_SUCCESS,
          isPasswordRelevant: res.success,
        });
      })
      .catch((error) =>
        dispatch({
          type: RESET_USER_PASSWORD_FALED,
          error: error,
        })
      );
  };
};

export { forgotPassword, resetPassword, setResetFormValue };
