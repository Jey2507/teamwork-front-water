import { useEffect, useRef, useCallback } from 'react';
import css from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/ModalSlice';
import sprite from '../../assets/sprite.svg'; 

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const { current: modalElement } = modalRef;
      modalElement.focus();
      modalElement.addEventListener('keydown', handleKeyDown);

      return () => {
        modalElement.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, handleKeyDown]);

  if (!isModalOpen) return null;

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      ref={modalRef}
      tabIndex="-1"
    >
      <div className={css.modalContainer}>
        <button className={css.closeButton} onClick={handleClose}>
        <svg className={css.icon}>
            <use xlinkHref={`${sprite}#icon-x`} />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;