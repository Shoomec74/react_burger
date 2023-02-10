import React, { FC, FormEvent } from "react";
import registerStyles from "./register.module.css";
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import { registerUser } from "../../services/actions/register";
import { getCookie } from "../../services/utils";
import useForm from "../../hooks/useForm/useForm";
import { TLocation } from "../../types";

export const Register: FC = () => {
  const { registerPage, form, link } = registerStyles;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();

  const { isLoading } = useSelector(store => ({
    isLoading: store.registerUser.isLoading
  }));

  const initialValuesForm = {
    name: "",
    email: "",
    password: ""
  };

  const { values, handleChange, setValues } = useForm(initialValuesForm);
  const { name, email, password } = values;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
    setValues(initialValuesForm);
  };

  if (getCookie("token")) {
    // Если объект state не является undefined, вернём пользователя назад.
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={registerPage}>
      <form className={form} onSubmit={handlerSubmit}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            // icon={"undefined"}
            name={"name"}
            size={"default"}
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            // icon={"undefined"}
            name={"email"}
            size={"default"}
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={handleChange}
            value={password}
            name={"password"}
          ></PasswordInput>
        </div>
        <Button
          type="primary"
          size="medium"
          disabled={
            isLoading || !(name !== "" && email !== "" && password !== "")
          }
          htmlType={"button"}
        >
          {isLoading ? "Подождите..." : "Зарегистрироваться"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
        Уже зарегистрировались?&nbsp;
        <Link className={`${link} text text_type_main-default`} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
