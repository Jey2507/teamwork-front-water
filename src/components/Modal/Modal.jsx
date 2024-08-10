import Modal from 'react-modal';
import css from './Modal.module.css';
// import sprite from '../../assets/sprite.svg';
import { icons as sprite } from '../../assets/index.js';

const ModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}  // Закриває модальне вікно при натисканні на backdrop або Escape
      className={css.modalContainer}
      overlayClassName={css.backdrop}
      ariaHideApp={false}
    >
      <div className={css.contentWrapper}>
        <button className={css.closeButton} onClick={onClose}>
        <svg className={css.icon}>
            <use xlinkHref={`${sprite}#icon-x`} /> 
          </svg>
        </button>
        <div className={css.content}>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;


/* import { useEffect, useRef } from 'react';
import css from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/ModalSlice';
import sprite from '../../assets/sprite.svg';

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
        <div className={css.contentWrapper}>
          <button className={css.closeButton} onClick={handleClose}>
            <svg className={css.icon}>
              <use xlinkHref={`${sprite}#icon-x`} />
            </svg>
          </button>
          <div className={css.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; */