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
} from "../../utils/constants.ts";
import { request } from "../../utils/utils.js";
import { setCookie, getCookie } from "../utils.ts";

const getUserInfo = () => {
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

const updateUserToken = (refreshToken) => {
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

const updateUserInfo = (formData) => {
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
          formFieldPassword: formData.password,
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
