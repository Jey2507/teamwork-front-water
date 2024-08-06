import { selectDailyNorma } from '../../redux/auth/selectors';
import css from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';

export default function WaterDailyNorma() {
  let waterDailyNorma = 1.5;
  if (useSelector(selectDailyNorma) !== null) {
    waterDailyNorma = useSelector(selectDailyNorma);
     
  }


   
  return (
    <div className={css.container}>
      <p className={css.norma}>{waterDailyNorma}L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
