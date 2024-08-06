import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { icons as sprite } from '../../assets/index';
import { openModal } from '../../redux/ModalSlice';
import css from '../UserBarPopover/UserBarPopover.module.css';

export default function UserBarPopover({ onClose }) {
  const dispatch = useDispatch();
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLogoutClick = () => {
    dispatch(openModal({ type: 'LOGOUT' }));
    onClose(); // Закриваємо поповер при відкритті модального вікна
  };

  return (
    <div className={css.userBarPopover} ref={popoverRef}>
      <button className={css.popoverButton}>
        <svg className={css.settingIcon} width="16" height="16">
          <use href={`${sprite}#icon-settings`} />
        </svg>
        <span className={css.settingsText}>Setting</span>
      </button>
      <button className={css.popoverButton} onClick={handleLogoutClick}>
        <svg className={css.logoutIcon} width="16" height="16">
          <use href={`${sprite}#icon-log-out`} />
        </svg>
        <span className={css.logoutText}>Log out</span>
      </button>
    </div>
  );
}
