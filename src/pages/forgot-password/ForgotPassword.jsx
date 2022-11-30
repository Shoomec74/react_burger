import React from "react";
import forgotPasswordStyles from "./forgotPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../services/actions/resetPassword.js";
import { getCookie } from "../../services/utils";
import useForm from "../../hooks/useForm/useForm";

export function ForgotPassword() {
  const { forgotPasswordPage, form, link } = forgotPasswordStyles;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isPasswordRecovery, isLoading } = useSelector((store) => ({
    isPasswordRecovery: store.resetPassword.isPasswordRecovery,
    isLoading: store.resetPassword.isLoading,
  }));

  const initialValuesForm = { email: ""};
  const { values, handleChange, setValues } = useForm(initialValuesForm);
  const { email } = values;

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setValues(initialValuesForm);
  };

  if (getCookie("token")) {
    return <Redirect to={location.state?.from || "/"} />;
  } else if (isPasswordRecovery) {
    history.replace({ pathname: "/reset-password" });
  }

  return (
    <div className={forgotPasswordPage}>
      <form className={form} onSubmit={handlerSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <div className="mb-6">
          <Input
            type={"email"}
            name={"email"}
            value={email}
            placeholder={"Укажите E-mail"}
            icon={"undefined"}
            size={"default"}
            onChange={handleChange}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          disabled={isLoading || !(email !== "")}
        >
          {isLoading ? "Подождите..." : "Восстановить"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link className={`${link} text text_type_main-default`} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
