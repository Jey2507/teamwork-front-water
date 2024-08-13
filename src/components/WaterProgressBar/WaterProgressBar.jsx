// import { selectDailyNorma } from "../../redux/auth/selectors";
// import { selectPercentDay } from "../../redux/water/selectors";
import { number } from 'yup';
import { format, isToday, parseISO } from 'date-fns';
import { selectUser } from '../../redux/auth/selectors';
import { selectDate, selectWaterDate } from '../../redux/water/selectors';
import css from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import ChooseDate from '../ChooseDate/ChooseDate';

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
    return Math.round((waterDay / norma) * 100);
  }

  let percentDaily = percentDailyCalc(amount, dailyNormaMl);

  if (!percentDaily || percentDaily < 0 || typeof percentDaily !== 'number') {
    percentDaily = 0;
    // console.log(percentDaily )
  } else if (percentDaily > 100) {
    percentDaily = 100;
  }

  let circleRightMod = -2;

  if (percentDaily <= 2) {
    circleRightMod = -10;
  } else if (percentDaily > 2 && percentDaily < 7) {
    circleRightMod = -8;
  } else if (percentDaily >= 7 && percentDaily < 10) {
    circleRightMod = -6;
  }

  let floatPercentMod = -7;

  if (percentDaily < 4 && percentDaily >= 0) {
    floatPercentMod = -3;
  } else if (percentDaily >= 4 && percentDaily < 12) {
    floatPercentMod = -4;
  } else if (percentDaily >= 12 && percentDaily < 13) {
    floatPercentMod = -5;
  } else if (percentDaily >= 13 && percentDaily < 20) {
    floatPercentMod = -6;
  } else if (percentDaily >= 20 && percentDaily < 26) {
    floatPercentMod = -6.5;
  }

  const selectedData = useSelector(selectDate);
  const parsedDate = parseISO(selectedData);
  const isTodayData = isToday(parsedDate);

  const formattedDate = isTodayData ? 'Today' : format(parsedDate, 'd, MMMM');

  return (
    <div className={css.container}>
      <p className={css.text}>{formattedDate}</p>
      <div className={css.backBar}>
        <div
          className={css.frontBar}
          style={{
            width: `${percentDaily}%`,
          }}
        >
          <div className={css.frontBarCircle} style={{ right: circleRightMod }}>
            <div className={css.floatPercent} style={{ right: floatPercentMod }}>
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
