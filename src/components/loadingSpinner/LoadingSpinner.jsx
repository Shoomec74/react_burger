import React from "react";
import spinerStyles from "./loadingSpinner.module.css";

function LoadingSpinner() {
  const { spinnerContainer, spinner, spinnerBlur} = spinerStyles;
  return (
    <div className={spinnerContainer}>
      <div className={spinner}>
        <span className={spinnerBlur}></span>
        <span className={spinnerBlur}></span>
        <span className={spinnerBlur}></span>
        <span className={spinnerBlur}></span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
