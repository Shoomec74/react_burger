import React from "react";
import registerStyles from "./register.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/actions/register.js";
import { setRegisterFormValue } from "../../services/actions/register.js";
import { getCookie } from "../../services/utils";

export function Register() {
  const { registerPage, form, link } = registerStyles;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { name, email, password, isLoading } = useSelector((store) => ({
    name: store.registerUser.form.name,
    email: store.registerUser.form.email,
    password: store.registerUser.form.password,
    isLoading: store.registerUser.isLoading,
  }));

  const onChange = (e) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
    console.log(name, email, password);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };

  if (getCookie("token")) {
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
            icon={"undefined"}
            name={"name"}
            size={"default"}
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            icon={"undefined"}
            name={"email"}
            size={"default"}
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onChange}
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
}
