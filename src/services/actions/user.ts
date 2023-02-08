import { Form } from "../../hooks/useForm/useForm";
import { TUserResponse } from "../../types/data";
import {
  BASE_API_AUTH,
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
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../actions-types";
import { setCookie, getCookie } from "../utils";

export interface IGetUserInfo {
  readonly type:
    | typeof GET_USER_INFO_REQUEST
    | typeof GET_USER_INFO_SUCCESS
    | typeof GET_USER_INFO_FALED;
  readonly user: TUserResponse;
  readonly error: Error;
}

export interface IUpdateUserToken {
  readonly type:
    | typeof UPDATE_USER_TOKEN_REQUEST
    | typeof UPDATE_USER_TOKEN_SUCCES
    | typeof UPDATE_USER_TOKEN_FALED;
  readonly error: Error;
}

export interface IUpdateUserInfo {
  readonly type:
    | typeof UPDATE_USER_INFO_REQUEST
    | typeof UPDATE_USER_INFO_SUCCESS
    | typeof UPDATE_USER_INFO_FALED;
  readonly user: TUserResponse;
  readonly error: Error;
}

export type TActionUser = IGetUserInfo | IUpdateUserToken | IUpdateUserInfo;

function getUserInfo(): (dispatch:any) =>void {
  return (dispatch) => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
    request(`${BASE_API_AUTH}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          user: res.user,
        });
      })
      .catch((error) =>
        dispatch({
          type: GET_USER_INFO_FALED,
          error: error,
        })
      );
  };
};

function updateUserToken(refreshToken: string): (dispatch:any) => void {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_TOKEN_REQUEST,
    });
    request(`${BASE_API_AUTH}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: UPDATE_USER_TOKEN_SUCCES,
        });
      })
      .catch((error) =>
        dispatch({
          type: UPDATE_USER_TOKEN_FALED,
          error: error,
        })
      );
  };
};

function updateUserInfo(formData: Form): (dispatch:any) => void {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });
    request(`${BASE_API_AUTH}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          user: res.user,
          // formFieldPassword: formData.password,
        });
      })
      .catch((error) =>
        dispatch({
          type: UPDATE_USER_INFO_FALED,
          error: error,
        })
      );
  };
};

export { getUserInfo, updateUserToken, updateUserInfo };
