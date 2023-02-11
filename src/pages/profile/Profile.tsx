import React, { useMemo, FormEvent, ChangeEvent, FC } from "react";
import profileStyles from "./profile.module.css";
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
import { updateUserInfo } from "../../services/actions/user";
import { signOut } from "../../services/actions/authorization";
import { ProfileOrders } from "..";
import useForm from "../../hooks/useForm/useForm";
import { WS_CONNECTION_CLOSED } from "../../utils/constants";

export const Profile: FC = () => {
  const { profilePage, form, link, activeLink, navigation } = profileStyles;
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(store => ({
    user: store.userInfo.user,
    isLoading: store.userInfo.isLoading
  }));

  const { values, handleChange, setValues } = useForm(user);
  const { name, email, password } = values;

  const refreshToken = localStorage.getItem("refreshToken");

  const isFormByChanged = useMemo(() => {
    for (const key in values) {
      if (values[key] !== user[key as keyof typeof user]) {
        return true;
      }
    }
    return false;
  }, [values]);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserInfo(values));
  };

  function handlerOnClick(){
    dispatch({ type: WS_CONNECTION_CLOSED });
    dispatch(signOut(refreshToken));
  };

  function resetForm (){
    setValues(user);
  };

  return (
    <div className={profilePage}>
      <nav className={`${navigation} mr-15`}>
        <NavLink
          to="/profile"
          exact
          className={`${link} text text_type_main-medium text_color_inactive`}
          activeClassName={activeLink}
        >
          ПРОФИЛЬ
        </NavLink>
        <NavLink
          to="/profile/orders"
          exact
          className={`${link} text text_type_main-medium text_color_inactive`}
          activeClassName={activeLink}
        >
          ИСТОРИЯ ЗАКАЗОВ
        </NavLink>
        <NavLink
          to="/login"
          exact
          className={`${link} text text_type_main-medium text_color_inactive mb-20`}
          activeClassName={activeLink}
          onClick={handlerOnClick}
        >
          {isLoading ? "ПОДОЖДИТЕ..." : "ВЫХОД"}
        </NavLink>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Switch>
        <Route path="/profile/orders" exact>
          <ProfileOrders />
        </Route>
        <Route path="/profile" exact>
          <form className={form} onSubmit={handlerSubmit}>
            <div className="mb-6">
              <Input
                type={"text"}
                placeholder={"Имя"}
                icon={"EditIcon"}
                name={"name"}
                value={name}
                size={"default"}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type={"email"}
                placeholder={"Логин"}
                icon={"EditIcon"}
                name={"email"}
                value={email}
                size={"default"}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type={"password"}
                placeholder={"Пароль"}
                name={"password"}
                value={password}
                icon={"EditIcon"}
                size={"default"}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button
                type="secondary"
                size="medium"
                onClick={resetForm}
                htmlType={"button"}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                disabled={!isFormByChanged || isLoading}
                htmlType={"submit"}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
};
