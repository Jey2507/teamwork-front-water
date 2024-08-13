import { useEffect, useState, useCallback } from 'react';
import css from '../UserBar/UserBar.module.css';
import { icons as sprite } from '../../assets/index.js';
import { useAuth } from '../../hooks/useAut'; // Виправлено імпорт
import LogOutModal from '../LogOutModal/LogOutModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { openModal } from '../../redux/ModalSlice.js';

const MODAL_TYPES = {
  LOGOUT: 'LOGOUT',
  SETTING: 'SETTING',
};

const getFirstName = fullName => (fullName ? fullName.split(' ')[0] : 'User');

const Userbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const { isModalOpen, modalType } = useSelector(state => state.modal);

  const renderModal = () => {
    switch (modalType) {
      case MODAL_TYPES.LOGOUT:
        return <LogOutModal />;
      case MODAL_TYPES.SETTING:
        return <UserSettingsModal />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(refreshUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isUserUpdated) {
      dispatch(refreshUser());
      setIsUserUpdated(false);
    }
  }, [dispatch, isUserUpdated]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  }, []);

  const handleSettingsClick = useCallback(() => {
    dispatch(openModal({ type: MODAL_TYPES.SETTING }));
    setMenuOpen(false);
  }, [dispatch]);

  const handleLogOutClick = useCallback(() => {
    dispatch(openModal({ type: MODAL_TYPES.LOGOUT }));
    setMenuOpen(false);
  }, [dispatch]);

  return (
    <div className={css.userBarMenu} data-tour="step-7">
      <button className={css.userBarBtn} onClick={toggleMenu}>
        {getFirstName(userInfo?.name)}
        {userInfo?.avatar ? (
          <img src={userInfo.avatar} alt="User Avatar" className={css.avatar} />
        ) : (
          <span className={css.avatarPlaceholder}>.</span>
        )}
        <svg className={`${css.chevron} ${menuOpen ? css.open : ''}`}>
          <use xlinkHref={`${sprite}#icon-arrow-down`} />
        </svg>
      </button>
      {menuOpen && (
        <div className={css.userBarOpenMenu}>
          <ul className={css.wrapperLink}>
            <li>
              <a onClick={handleSettingsClick} className={css.userBarLink}>
                <svg className={css.popupIcon} width="16" height="16">
                  <use xlinkHref={`${sprite}#icon-settings`} />
                </svg>
                Setting
              </a>
            </li>
            <li>
              <a onClick={handleLogOutClick} className={css.userBarLink}>
                <svg className={css.popupIcon} width="16" height="16">
                  <use xlinkHref={`${sprite}#icon-log-out`} />
                </svg>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      )}
      {isModalOpen && renderModal()}
    </div>
  );
};

export default Userbar;
