import { forwardRef } from 'react';
import css from './UserBar.module.css';
import { icons as sprite } from '../../assets/index';

const UserBar = forwardRef(({ username, avatar, onClick, isPopoverOpen }, ref) => {
  return (
    <div className={css.userBarContainer} ref={ref}>
      <button className={css.userBar} onClick={onClick}>
        <span className={css.nameBar}>{username}{'User'}</span>
        {/* {'User'} потрібно видалити */}
        <img src={avatar} alt={`${username}'s avatar`} className={css.avatar} />
        <svg className={css.dropdownIcon} width="16" height="16" fill="none">
          <use href={`${sprite}#icon-${isPopoverOpen ? 'arrow-up' : 'arrow-down'}`} />
        </svg>
      </button>
    </div>
  );
});

export default UserBar;
