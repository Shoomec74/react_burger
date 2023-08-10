import React, { FC } from "react";
import modalOverlayStyles from "./modalOverlay.module.css";

interface IProps {
  onClose: () => void;
}

const ModalOverlay: FC<IProps> = ({ onClose }) => {
  const { overlay } = modalOverlayStyles;
  return <div className={overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
