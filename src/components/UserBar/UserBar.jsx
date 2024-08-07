import { useEffect, useState } from 'react';
import css from '../UserBar/UserBar.module.css';
import { icons as sprite } from '../../assets/index.js';
import { useAuth } from '../../hooks/useAut';
import LogOutModal from '../LogOutModal/LogOutModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { openModal } from '../../redux/ModalSlice.js';

const Userbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const { isModalOpen, modalType } = useSelector(state => state.modal);

  const renderModal = () => {
    switch (modalType) {
      case 'LOGOUT':
        return <LogOutModal />;
      case 'SETTING':
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getFirstName = fullName => {
    return fullName ? fullName.split(' ')[0] : 'User';
  };

  return (
      <div className={css.userBarMenu} data-tour="step-7">
        <button className={css.userBarBtn} onClick={toggleMenu}>
          {getFirstName(userInfo?.data.name)}
          {userInfo?.data.avatar ? (
            <img
              src={userInfo.avatar}
              alt="User Avatar"
              className={css.avatar}
            />
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
              <a
                onClick={() => dispatch(openModal({ type: 'SETTING' }))}
                className={css.userBarLink}
              >
                <svg width="16" height="16">
                  <use xlinkHref={`${sprite}#icon-settings`} />
                </svg>
                Settings
              </a>
            </li>
            <li>
              <a
                className={css.userBarLink}
                onClick={() => dispatch(openModal({ type: 'LOGOUT' }))}
              >
                <svg width="16" height="16">
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
