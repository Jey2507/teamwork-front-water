import { useEffect, useRef } from 'react';
import { icons as sprite } from '../../assets/index';
import css from '../UserBarPopover/UserBarPopover.module.css';
// import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
// import LogOutModal from '../LogOutModal/LogOutModal';

export default function UserBarPopover({ onClose }) {
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

  return (
    <div className={css.userBarPopover} ref={popoverRef}>
      <button className={css.popoverButton} onClick={() => setShowSettingsModal(true)}>
        <svg className={css.settingIcon} width="16" height="16">
          <use href={`${sprite}#icon-settings`} />
        </svg>
        <span className={css.settingsText}>Setting</span>
      </button>
      <button className={css.popoverButton} onClick={() => setShowLogOutModal(true)}>
        <svg className={css.logoutIcon} width="16" height="16">
          <use href={`${sprite}#icon-log-out`} />
        </svg>
        <span className={css.logoutText}>Log out</span>
      </button>
      {/* {showSettingsModal && <UserSettingsModal onClose={() => setShowSettingsModal(false)} />} */}
      {/* {showLogOutModal && <LogOutModal onClose={() => setShowLogOutModal(false)} />} */}
    </div>
  );
}
