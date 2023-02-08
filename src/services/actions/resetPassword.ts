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

export interface IForgotPassword {
  readonly type: typeof FORGOT_USER_PASSWORD_REQUEST | typeof FORGOT_USER_PASSWORD_SUCCESS | typeof FORGOT_USER_PASSWORD_FALED;
  readonly isUserRegistered: boolean;
  readonly error: Error;
}

export interface IResetPassword {
  readonly type: typeof RESET_USER_PASSWORD_REQUEST | typeof RESET_USER_PASSWORD_SUCCESS | typeof RESET_USER_PASSWORD_FALED;
  readonly isPasswordRelevant: boolean;
  error: Error;
}

export type TActionResetPassword =
  | IForgotPassword
  | IResetPassword;

function forgotPassword(email: string): (dispatch: any) => void {
  return (dispatch) => {
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
};

function resetPassword(password: string, token: string): (dispatch:any) => void {
  return (dispatch) => {
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
};

export { forgotPassword, resetPassword };
