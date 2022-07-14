import React from "react";
import headerMenuElementStyles from "./headerMenuElement.module.css";

const HeaderMenuElement = (props) => {
  const { element, title, link } = headerMenuElementStyles;
  return (
    <li className={`${element} pl-5 pr-5`}>
      <a className={link} href="#">
        <p
          className={`${title} ${
            props.text === "default"
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }`}
        >
          {props.children}
        </p>
      </a>
    </li>
  );
};

export default HeaderMenuElement;
