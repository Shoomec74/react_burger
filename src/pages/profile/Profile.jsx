import React, { useState, useMemo, useCallback } from "react";
import profileStyles from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  NavLink,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../services/actions/user.js";
import { signOut } from "../../services/actions/authorization.js";
import { Orders } from "../../pages";

export function Profile() {
  const { profilePage, form, link, activeLink, navigation } = profileStyles;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { user, isLoading } = useSelector((store) => ({
    user: store.userInfo.user,
    isLoading: store.userInfo.isLoading,
  }));
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });
  const refreshToken = localStorage.getItem("refreshToken");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormByChanged = useMemo(() => {
    for (const key in formData) {
      if (formData[key] !== user[key]) {
        return true;
      }
    }
    return false;
  }, [formData]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
  };

  const handlerOnClick = useCallback(() => {
    dispatch(signOut(refreshToken));
  }, []);

  const resetForm = (e) => {
    e.preventDefault();
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
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
          <Orders />
        </Route>
        <Route path="/profile" exact>
          <form className={form} onSubmit={handlerSubmit}>
            <div className="mb-6">
              <Input
                type={"text"}
                placeholder={"Имя"}
                icon={"EditIcon"}
                name={"name"}
                value={formData.name}
                size={"default"}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type={"email"}
                placeholder={"Логин"}
                icon={"EditIcon"}
                name={"email"}
                value={formData.email}
                size={"default"}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type={"password"}
                placeholder={"Пароль"}
                name={"password"}
                value={formData.password}
                icon={"EditIcon"}
                size={"default"}
                onChange={onChange}
              />
            </div>
            <div>
              <Button type="secondary" size="medium" onClick={resetForm}>
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                disabled={!isFormByChanged || isLoading}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
}
