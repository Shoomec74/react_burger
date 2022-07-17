import React from "react";
import spinerStyles from "./loadingSpinner.module.css";

function LoadingSpinner() {
  const { loadingSpinner, spinnerContainer } = spinerStyles;
  return (
    <div className={spinnerContainer}>
      <div className={loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;