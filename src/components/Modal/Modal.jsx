import { useEffect, useRef } from 'react';
import css from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/ModalSlice';
import { icons as sprite } from "../../assets/index.js";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalRef = useRef(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      ref={modalRef}
      tabIndex="-1"
    >
      <div className={css.modalContainer}>
      <button className={css.closeButton} onClick={handleClose}>
      <svg
                  width="20"
                  height="20"
                  className={css.togglePassword}
               
                >
                  <use
                    xlinkHref={`${sprite}#${
                      "icon-eye-off"
                    }`}
                  />
                </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

