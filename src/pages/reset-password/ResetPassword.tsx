import React, { FC, FormEvent } from "react";
import resetPasswordStyles from "./resetPassword.module.css";
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import { resetPassword } from "../../services/actions/resetPassword";
import { getCookie } from "../../services/utils";
import useForm from "../../hooks/useForm/useForm";
import { TLocation } from "../../types";

export const ResetPassword: FC = () => {
  const { resetPasswordPage, form, link } = resetPasswordStyles;
  const { isPasswordRecovery, isPasswordRelevant, isLoading } = useSelector(
    store => ({
      isPasswordRecovery: store.resetPassword.isPasswordRecovery,
      isPasswordRelevant: store.resetPassword.isPasswordRelevant,
      isLoading: store.resetPassword.isLoading
    })
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const initialValuesForm = { password: "", token: "" };
  const { values, handleChange, setValues } = useForm(initialValuesForm);
  const { password, token } = values;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues(initialValuesForm);
    dispatch(resetPassword(password, token));
  };

  if (getCookie("token")) {
    return <Redirect to={location.state?.from || "/"} />;
  } else if (isPasswordRelevant) {
    history.replace({ pathname: "/login" });
  } else if (!isPasswordRecovery) {
    history.replace({ pathname: "/forgot-password" });
  }

  return (
    <div className={resetPasswordPage}>
      <form className={form} onSubmit={handlerSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <div className="mb-6">
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            value={password}
            name={"password"}
          ></PasswordInput>
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            // icon={"undefined"}
            name={"token"}
            value={token}
            size={"default"}
            onChange={handleChange}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          disabled={isLoading || !(password !== "" && token !== "")}
          htmlType={"button"}
        >
          {isLoading ? "Подождите..." : "Сохранить"}
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
};
