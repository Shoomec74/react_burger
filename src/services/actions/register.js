import {
  BASE_API_AUTH,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FALED,
  SET_REGISTER_FORM_VALUE,
} from "../../utils/constants.js";
import { setCookie } from "../utils.js";
import { checkResponse } from "../../utils/utils.js";

const setRegisterFormValue = (fieldForm, valueFieldForm) => ({
  type: SET_REGISTER_FORM_VALUE,
  fieldForm,
  valueFieldForm,
});

const registerUser = (name, email, password) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    fetch(`${BASE_API_AUTH}/register`, {
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
      .then(checkResponse)
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

export { registerUser, setRegisterFormValue };
