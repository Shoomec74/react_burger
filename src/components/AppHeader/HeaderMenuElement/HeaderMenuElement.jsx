import React from "react";
import headerMenuElementStyles from "./headerMenuElement.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const HeaderMenuElement = (props) => {
  const { element, title, link, activeLink } = headerMenuElementStyles;
  return (
    <li className={`${element} pl-5 pr-5`}>
      <NavLink className={link} to={props.path} activeClassName={activeLink}>
        <p
          className={`${title} ${
            props.text === "default" ?
                "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }`}>
          {props.children}
        </p>
      </NavLink>
    </li>
  );
};

HeaderMenuElement.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HeaderMenuElement;
