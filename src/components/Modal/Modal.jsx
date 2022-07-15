import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal({ isOpened, onClose, children }) {
  const { content, closeButton } = modalStyles;

  React.useEffect(() => {
    const handleESC = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleESC);
    return () => {
      document.removeEventListener("keydown", handleESC);
    };
  });

  if (!isOpened) return null;

  return ReactDOM.createPortal(
    <>
      <div className={content}>
        <button className={`${closeButton} mt-15 mr-10`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("modal")
  );
  Modal.propTypes ={
    isOpened: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.element
  }
}

export default Modal;
