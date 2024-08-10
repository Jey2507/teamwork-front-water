// import { selectDailyNorma } from "../../redux/auth/selectors";
// import { selectPercentDay } from "../../redux/water/selectors";
import { number } from 'yup';
import { selectUser } from '../../redux/auth/selectors';
import { selectWaterDate } from '../../redux/water/selectors';
import css from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';

export default function WaterProgressBar() {
  let waterDailyNormaBar = useSelector(selectUser);
  let waterDailyNorma;
  waterDailyNormaBar !== null
    ? (waterDailyNorma = waterDailyNormaBar.dailyNorma)
    : (waterDailyNorma = 1.5);
  


  let amount = 0;
  const items = useSelector(selectWaterDate);

  if (items && items.length > 0) {
    amount = items.reduce((total, item) => total + item.amount, 0);
  }


  const dailyNormaMl = waterDailyNorma * 1000;

  function percentDailyCalc(waterDay, norma) {
  return  Math.round((waterDay / norma) * 100);
}

  let percentDaily = percentDailyCalc(amount, dailyNormaMl);


  if (!percentDaily || percentDaily < 0 || typeof (percentDaily) !== "number") {
    percentDaily = 0;
    console.log(percentDaily )
  } else if (percentDaily > 100) {
    percentDaily = 100;
  } 




  return (
    <div className={css.container}>
      <p className={css.text}>Today</p>
 
      <div className={css.backBar}>
        <div
          className={css.frontBar}
          style={{
            width: `${percentDaily}%`,
          }}
        >

          <div className={css.frontBarCircle}>
                                  <div
          className={css.floatPercent}
        >
          {Math.round(percentDaily)}%
        </div>
          </div>
        </div>
 
      </div>

      <ul className={css.percentage}>
        <li className={css.stablePercent}>0%</li>
        <li className={css.stablePercent}>50%</li>
        <li className={css.stablePercent}>100%</li>
      </ul>
    </div>
  );
}
