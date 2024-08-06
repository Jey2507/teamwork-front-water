import { useEffect, useState, useRef } from 'react';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from '../UserPanel/UserPanel.module.css';

export default function UserPanel({ username, avatar }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

  return (
    <div className={css.userPanel}>
      <h1>Hello, {username}!</h1>
      <div className={css.userBarContainer} ref={userBarRef}>
        <UserBar
          username={username}
          avatar={avatar}
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
