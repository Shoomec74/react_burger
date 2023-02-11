import { TForm } from "../../hooks/useForm/useForm";
import { TUser } from "../../types";
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

interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}

type TUserRes = {
  readonly success: boolean;
  readonly user: TUser;
};

interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly response: TUserRes;
}

interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FALED;
  readonly error: Error;
}

const getUserInfo: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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
          response: res,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_INFO_FALED,
          error: error,
        });
      });
  };
};

interface IUpdateUserTokenRequest {
  readonly type: typeof UPDATE_USER_TOKEN_REQUEST;
}

interface IUpdateUserTokenSuccess {
  readonly type: typeof UPDATE_USER_TOKEN_SUCCES;
}

interface IUpdateUserTokenFailed {
  readonly type: typeof UPDATE_USER_TOKEN_FALED;
  readonly error: Error;
}

const updateUserToken: AppThunk = (refreshToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_USER_TOKEN_REQUEST,
    });
    request(`${BASE_API_AUTH}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    }).then((res) => {
      const accessToken = res.accessToken.split("Bearer ")[1];
      const refreshToken = res.refreshToken;
      setCookie("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch({
        type: UPDATE_USER_TOKEN_SUCCES,
      });
    });
    // .catch((error) =>
    //   dispatch({
    //     type: UPDATE_USER_TOKEN_FALED,
    //     error: error,
    //   })
    // );
  };
};

interface IUpdateUserInfoRequest {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
}

interface IUpdateUserInfoSuccess {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
  readonly user: TUserResponse;
}

interface IUpdateUserInfoFailed {
  readonly type: typeof UPDATE_USER_INFO_FALED;
  readonly error: Error;
}

const updateUserInfo: AppThunk = (formData: TForm) => {
  return (dispatch: AppDispatch) => {
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

export type TActionUser =
  | IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | IUpdateUserTokenRequest
  | IUpdateUserTokenSuccess
  | IUpdateUserTokenFailed
  | IUpdateUserInfoRequest
  | IUpdateUserInfoSuccess
  | IUpdateUserInfoFailed;

export { getUserInfo, updateUserToken, updateUserInfo };
