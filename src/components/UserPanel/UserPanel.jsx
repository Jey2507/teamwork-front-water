import { useEffect, useState, useRef } from 'react';
import {useSelector} from 'react-redux';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { selectUser } from '../../redux/auth/selectors';
import css from '../UserPanel/UserPanel.module.css';

export default function UserPanel({ username, avatar }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const userInfo = useSelector(selectUser);
  const userBarRef = useRef(null);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      userBarRef.current &&
      !userBarRef.current.contains(event.target) &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const getFirstName = (fullName) => {
  //   return fullName.split(' ')[0]
  // };


  return (
    <div className={css.userPanel}>
      <h2 className={css.hello}>Hello, {userInfo?.name}!</h2>
      <div className={css.userBarContainer} ref={userBarRef}>
        <UserBar
          username={userInfo?.name}
          avatar={userInfo?.avatar}
          isPopoverOpen={isPopoverOpen}
          onClick={togglePopover}
        />
        {isPopoverOpen && (
          <div ref={popoverRef} className={css.popoverWrapper}>
            <UserBarPopover onClose={() => setIsPopoverOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
