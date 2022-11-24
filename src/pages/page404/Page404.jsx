import React from "react";
import page404Styles from "./page404.module.css";

export function Page404() {
  const { page404, neonText } = page404Styles;
  return (
    <div className={`${page404} text text_type_main-medium`}>
      <h1 className={`${neonText} text text_type_digits-large`}>404</h1>
      <h2 className={neonText}>Упс, такой страницы не существует</h2>
    </div>
  );
}
