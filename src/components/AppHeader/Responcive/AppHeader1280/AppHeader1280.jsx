import React from "react";
import headerStyles from "./AppHeader1280.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderMenuElement from "../../HeaderMenuElement/HeaderMenuElement";

const AppHeader1280 = () => {
  const { header, menu, logo } = headerStyles;
  return (
    <header className={`${header} mt-10`}>
      <nav>
        <ul className={`${menu} pt-4 pb-4`}>
          <HeaderMenuElement text="default">
            <BurgerIcon type="primary" />
            Конструктор
          </HeaderMenuElement>
          <HeaderMenuElement text="inActive">
            <ListIcon type="secondary" />
            Лента заказов
          </HeaderMenuElement>
          <div className={logo}>
            <Logo />
          </div>
          <HeaderMenuElement text="inActive">
            <ProfileIcon type="secondary" />
            Личный кабинет
          </HeaderMenuElement>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader1280;
