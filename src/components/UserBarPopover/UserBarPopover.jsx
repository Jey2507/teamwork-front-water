import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { icons as sprite } from '../../assets/index';
import { openModal } from '../../redux/ModalSlice';
import css from '../UserBarPopover/UserBarPopover.module.css';

const MODAL_TYPES = {
  LOGOUT: 'LOGOUT',
  SETTING: 'SETTING',
};

export default function UserBarPopover({ onClose }) {
  const dispatch = useDispatch();
  const popoverRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleLogoutClick = () => {
    dispatch(openModal({ type: MODAL_TYPES.LOGOUT }));
    onClose();
  };

  const handleSettingsClick = () => {
    dispatch(openModal({ type: MODAL_TYPES.SETTING }));
    onClose();
  };

  return (
    <div className={css.userBarPopover} ref={popoverRef}>
      <button className={css.popoverButton} onClick={handleSettingsClick}>
        <svg className={css.settingIcon} width="16" height="16">
          <use xlinkHref={`${sprite}#icon-settings`} />
        </svg>
        <span className={css.settingsText}>Setting</span>
      </button>
      <button className={css.popoverButton} onClick={handleLogoutClick}>
        <svg className={css.logoutIcon} width="16" height="16">
          <use xlinkHref={`${sprite}#icon-log-out`} />
        </svg>
        <span className={css.logoutText}>Log out</span>
      </button>
    </div>
  );
}
