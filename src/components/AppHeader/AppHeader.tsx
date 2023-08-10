import React, { FC } from "react";
import headerStyles from "./appHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderMenuElement from "./HeaderMenuElement/HeaderMenuElement";
import { useLocation } from "react-router-dom";
import { TLocation } from "../../types";

const AppHeader: FC = () => {
  const { header, menu, logo } = headerStyles;
  const location = useLocation<TLocation>();

  return (
    <header className={`${header} mt-10`}>
      <nav>
        <ul className={`${menu} pt-4 pb-4`}>
          <HeaderMenuElement
            text={location.pathname === "/" ? "default" : "inactive"}
            path="/"
          >
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
            Конструктор
          </HeaderMenuElement>
          <HeaderMenuElement
            text={location.pathname === "/feed" ? "default" : "inactive"}
            path="/feed"
          >
            <ListIcon
              type={location.pathname === "/feed" ? "primary" : "secondary"}
            />
            Лента заказов
          </HeaderMenuElement>
          <div className={logo}>
            <Logo />
          </div>
          <HeaderMenuElement
            text={location.pathname === "/profile" ? "default" : "inactive"}
            path="/profile"
          >
            <ProfileIcon
              type={location.pathname === "/profile" ? "primary" : "secondary"}
            />
            Личный кабинет
          </HeaderMenuElement>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
