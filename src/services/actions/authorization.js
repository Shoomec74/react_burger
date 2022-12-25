import {
  BASE_API_AUTH,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FALED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FALED,
} from "../../utils/constants.ts";
import { setCookie, deleteCookie } from "../utils.ts";
import { request } from "../../utils/utils.js";

const signIn = (email, password) => {
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

const signOut = (refreshToken) => {
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
