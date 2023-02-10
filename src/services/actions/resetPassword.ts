import {
  BASE_API_URL,
  FORGOT_USER_PASSWORD_REQUEST,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_FALED,
  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FALED,
} from "../../utils/constants";
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../actions-types";

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_USER_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_USER_PASSWORD_SUCCESS;
  readonly isUserRegistered: boolean;
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_USER_PASSWORD_FALED;
  readonly error: Error;
}

interface IResetPasswordRequest {
  readonly type: typeof RESET_USER_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_USER_PASSWORD_SUCCESS;
  readonly isPasswordRelevant: boolean;
}

interface IResetPasswordFailed {
  readonly type: typeof RESET_USER_PASSWORD_FALED;
  readonly error: Error;
}

export type TActionResetPassword =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed;

const forgotPassword: AppThunk = (email: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: FORGOT_USER_PASSWORD_REQUEST,
    });
    request(`${BASE_API_URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
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
}

const resetPassword: AppThunk = (password: string,token: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_USER_PASSWORD_REQUEST,
    });
    request(`${BASE_API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
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
}

export { forgotPassword, resetPassword };
