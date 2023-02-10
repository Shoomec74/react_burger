import React, { FC } from "react";
import headerMenuElementStyles from "./headerMenuElement.module.css";
import { NavLink } from "react-router-dom";

interface IProps {
  text: string,
  children: React.ReactNode,
  path: string,
}

const HeaderMenuElement : FC<IProps> = (props) => {
  const { element, title, link, activeLink } = headerMenuElementStyles;
  return (
    <li className={`${element} pl-5 pr-5`}>
      <NavLink className={link} to={props.path} activeClassName={activeLink}>
        <p
          className={`${title} ${
            props.text === "default"
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }`}
        >
          {props.children}
        </p>
      </NavLink>
    </li>
  );
};

export default HeaderMenuElement;
