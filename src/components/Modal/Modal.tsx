import React, { FC } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface IStyles {
  [key: string]: string;
}

const Modal: FC<IProps> = ({ isOpened, onClose, children }) => {
  const { content, closeButton }: IStyles = modalStyles;

  React.useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpened) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpened]);

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
    document.getElementById("modal") as Element
  );
};

export default Modal;
