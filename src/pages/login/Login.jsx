import { useEffect } from "react";
import loginStyles from "./login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../services/actions/authorization.js";
import { setLoginFormValue } from "../../services/actions/authorization.js";
import { getCookie } from "../../services/utils";

export function Login() {
  const { loginPage, form, link } = loginStyles;
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const location = useLocation();
  const { email, password, isLoading } = useSelector((store) => ({
    email: store.authorization.form.email,
    password: store.authorization.form.password,
    isLoading: store.authorization.isLoading,
  }));

  const onChange = (e) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={loginPage}>
      <form className={form} onSubmit={handlerSubmit}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <div className="mb-6">
          <Input
            type={"email"}
            name={"email"}
            value={email}
            placeholder={"E-mail"}
            icon={"undefined"}
            size={"default"}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={password}
            name={"password"}
            onChange={onChange}
          ></PasswordInput>
        </div>
        <Button
          type="primary"
          size="medium"
          disabled={isLoading || !(email !== "" && password !== "")}
        >
          {isLoading ? "Подождите" : "Войти"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
        Вы — новый пользователь?&nbsp;
        <Link className={`${link} text text_type_main-default`} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?&nbsp;
        <Link
          className={`${link} text text_type_main-default`}
          to="/forgot-password"
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
