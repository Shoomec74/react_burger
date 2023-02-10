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

interface ISignInRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}

interface ISignInSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TUser;
}

interface ISignInFaled {
  readonly type: typeof LOGIN_USER_FALED;
  error: Error;
}

interface ISignOutRequest {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

interface ISignOutSuccess {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

interface ISignOutFailed {
  readonly type: typeof LOGOUT_USER_FALED;
  readonly error: Error;
}

export type TActionAuthorization =
  | ISignInRequest
  | ISignInSuccess
  | ISignInFaled
  | ISignOutRequest
  | ISignOutSuccess
  | ISignOutFailed;

const signIn: AppThunk = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
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

const signOut: AppThunk = (refreshToken: string) => {
  return (dispatch: AppDispatch) => {
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
}

export { signIn, signOut };
