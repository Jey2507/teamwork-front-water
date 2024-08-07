import { useSelector } from 'react-redux';
import UserBar from '../UserBar/UserBar';
import { selectUser } from '../../redux/auth/selectors';
import css from '../UserPanel/UserPanel.module.css';

export default function UserPanel() {
  const userInfo = useSelector(selectUser);
  const userName = userInfo.name;

  const getFirstName = fullName => {
    return fullName ? fullName : 'User';
  };

  if (!userInfo) {
    return null;
  }

  return (
    <div className={css.userBarWrapper}>
      <h2 className={css.hello}>
        Hello, <span className={css.span}>{getFirstName(userName)}</span>!
      </h2>
      <UserBar />
    </div>
  );
}
