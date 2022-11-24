import React from "react";
import resetPasswordStyles from "./resetPassword.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";
import { setResetFormValue } from "../../services/actions/resetPassword.js";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/resetPassword.js";
import { getCookie } from "../../services/utils";

export function ResetPassword() {
  const { loginPage, form, link } = resetPasswordStyles;
  const { password, token, isPasswordRecovery, isPasswordRelevant } = useSelector((store) => ({
    password: store.resetPassword.form.password,
    token: store.resetPassword.form.token,
    isPasswordRecovery: store.resetPassword.isPasswordRecovery,
    isPasswordRelevant: store.resetPassword.isPasswordRelevant,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const onChange = (e) => {
    dispatch(setResetFormValue(e.target.name, e.target.value));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  };

  if (getCookie("token")) {
    return <Redirect to={location.state?.from || "/"} />;
  }
  else if(isPasswordRelevant){
    history.replace({ pathname: "/login" });
  }
  else if (!isPasswordRecovery) {
    history.replace({ pathname: "/forgot-password" });
  }


  return (
    <div className={loginPage}>
      <form className={form} onSubmit={handlerSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <div className="mb-6">
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={onChange}
            value={password}
            name={"password"}
          ></PasswordInput>
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            icon={"undefined"}
            name={"token"}
            value={token}
            size={"default"}
            onChange={onChange}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
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
