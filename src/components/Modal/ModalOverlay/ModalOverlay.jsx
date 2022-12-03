import React from "react";
import modalOverlayStyles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  const { overlay } = modalOverlayStyles;
  return <div className={overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
