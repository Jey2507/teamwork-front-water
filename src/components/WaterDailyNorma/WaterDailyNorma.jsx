import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors';

export default function WaterDailyNorma() {
  let waterDailyNormaBar = useSelector(selectUser);
  let waterDailyNorma;
  waterDailyNormaBar !== null
    ? (waterDailyNorma = waterDailyNormaBar.dailyNorma)
    : (waterDailyNorma = 1.5);

  return (
    <div className={css.container}>
      <p className={css.norma}>{waterDailyNorma}L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
