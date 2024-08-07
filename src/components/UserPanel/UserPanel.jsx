import { useSelector } from 'react-redux';
import UserBar from '../UserBar/UserBar';
import { selectUser } from '../../redux/auth/selectors';
import css from '../UserPanel/UserPanel.module.css';

export default function UserPanel() {

  const userInfo = useSelector(selectUser);
  console.log("00000000000000", userInfo)


  const getFirstName = (fullName) => {
    return fullName ? fullName : 'User';
  };

  if (!userInfo) {
    return null; 
  }

  return (
    <div className={css.userBarWrapper}>
      <h2 className={css.hello}>
        Hello, <span className={css.span}>{getFirstName(userInfo.data.name)}</span>!
      </h2>
        <UserBar />
    </div>
  );
}
