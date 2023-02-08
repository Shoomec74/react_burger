import {
  BASE_API_AUTH,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FALED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FALED,
} from "../../utils/constants";
import { setCookie, deleteCookie } from "../utils";
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../actions-types";
import { TUser } from "../../types/index";

export interface ISignIn {
  readonly type:
    | typeof LOGIN_USER_REQUEST
    | typeof LOGIN_USER_SUCCESS
    | typeof LOGIN_USER_FALED;
  readonly user: TUser;
  readonly error: Error;
}

export interface ISignOut {
  readonly type:
    | typeof LOGOUT_USER_REQUEST
    | typeof LOGOUT_USER_SUCCESS
    | typeof LOGOUT_USER_FALED;
  readonly refreshToken: string;
  readonly error: Error;
}

export type TActionAuthorization = ISignIn | ISignOut;

function signIn(email: string, password: string): (dispatch: any) => void {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    request(`${BASE_API_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: res,
        });
      })
      .catch((error) =>
        dispatch({
          type: LOGIN_USER_FALED,
          error: error,
        })
      );
  };
};

function signOut(refreshToken: string): (dispatch: any) => void{
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    request(`${BASE_API_AUTH}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then((res) => {
        deleteCookie("token");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
      })
      .catch((error) =>
        dispatch({
          type: LOGOUT_USER_FALED,
          error: error,
        })
      );
  };
};

export { signIn, signOut };
