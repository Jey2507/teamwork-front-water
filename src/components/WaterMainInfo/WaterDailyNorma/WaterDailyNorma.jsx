import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors';

const WaterDailyNorma = () => {
  const user = useSelector(selectUser);

  let dailynorma = 1.5;
  if (user.dailyWaterIntake) {
    dailynorma = user.dailyWaterIntake;
  }

  return (
    <div className={css.waterDailyNormaContainer}>
      <div className={css.textContainer}>
        <p className={css.liter}>{dailynorma} L</p>
        <p className={css.literDesctiption}>My daily norma</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;