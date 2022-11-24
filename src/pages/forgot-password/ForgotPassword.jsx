import React from "react";
import forgotPasswordStyles from "./forgotPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setResetFormValue } from "../../services/actions/resetPassword.js";
import {forgotPassword} from '../../services/actions/resetPassword.js';
import { getCookie } from "../../services/utils";

export function ForgotPassword() {
  const { loginPage, form, link } = forgotPasswordStyles;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { email, isPasswordRecovery } = useSelector((store) => ({
    email: store.resetPassword.form.email,
    isPasswordRecovery: store.resetPassword.isPasswordRecovery,
  }));

  const onChange = (e) => {
    dispatch(setResetFormValue(e.target.name, e.target.value));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }

  if(getCookie('token')){
    return (<Redirect to={location.state?.from || '/'} />)
  }
  else if(isPasswordRecovery){
    history.replace({ pathname: "/reset-password" });
  }

  return (
    <div className={loginPage}>
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
            onChange={onChange}
          />
        </div>
        <Button type="primary" size="medium">
          Восстановить
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
