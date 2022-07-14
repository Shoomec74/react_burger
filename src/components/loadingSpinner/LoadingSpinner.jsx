import React from "react";
import spinerStyles from "./loadingSpinner.module.css";

export default function LoadingSpinner() {
  const { loadingSpinner, spinnerContainer } = spinerStyles;
  return (
    <div className={spinnerContainer}>
      <div className={loadingSpinner}></div>
    </div>
  );
}
