import loginStyles from "./login.module.css";
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import { signIn } from "../../services/actions/authorization";
import { getCookie } from "../../services/utils";
import useForm from "../../hooks/useForm/useForm";
import { TLocation } from "../../types";
import { FC, FormEvent } from "react";

export const Login: FC = () => {
  const { loginPage, form, link } = loginStyles;
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const location = useLocation<TLocation>();
  const { isLoading } = useSelector(store => ({
    isLoading: store.authorization.isLoading,
    isLogin: store.authorization.isLogin
  }));
  const initialValuesForm = { email: "", password: "" };
  const { values, handleChange, setValues } = useForm(initialValuesForm);
  const { email, password } = values;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(email, password));
    setValues(initialValuesForm);
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
            // icon={"undefined"}
            size={"default"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={password}
            name={"password"}
            onChange={handleChange}
          ></PasswordInput>
        </div>
        <Button
          type="primary"
          size="medium"
          disabled={isLoading || !(email !== "" && password !== "")}
          htmlType={"button"}
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
};
