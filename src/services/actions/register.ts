import {
  BASE_API_AUTH,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FALED,
} from "../../utils/constants";
import { setCookie } from "../utils";
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../actions-types";
import { TUser } from "../../types/index";

export interface IRegister {
  readonly type: typeof REGISTER_USER_REQUEST | typeof REGISTER_USER_SUCCESS | typeof REGISTER_USER_FALED;
  readonly user?: TUser;
  readonly error?: Error;
}

export type TActionregister = IRegister;

const registerUser: AppThunk = (name: string, email: string, password: string) => {
  return (dispatch: AppDispatch) => {
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
