import React from 'react';
import Style from './style.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={Style.modal_overlay} onClick={onClose}>
      <div className={Style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={Style.modal_header}>
          <button className={Style.modal_close_button} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={Style.modal_body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
