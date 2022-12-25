import {
  BASE_API_AUTH,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FALED,
} from "../../utils/constants.ts";
import { setCookie } from "../utils.ts";
import { request } from "../../utils/utils.js";

const registerUser = (name, email, password) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    request(`${BASE_API_AUTH}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
          type: REGISTER_USER_SUCCESS,
          user: res,
        });
      })
      .catch((error) =>
        dispatch({
          type: REGISTER_USER_FALED,
          error: error,
        })
      );
  };
};

export { registerUser };
