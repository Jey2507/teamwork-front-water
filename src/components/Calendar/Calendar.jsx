import { CalendarItem } from '../CalendarItem/CalendarItem.jsx';
import { startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import css from './Calendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth, selectWaterMonth } from '../../redux/water/selectors.js';
import { useEffect } from 'react';
import { getWaterMonth } from '../../redux/water/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { setCurrentDate } from '../../redux/water/slice.js';

export const Calendar = () => {
  const dispatch = useDispatch();
  let waterDailyNormaBar = useSelector(selectUser);
  let waterDailyNorma;
  waterDailyNormaBar !== null
    ? (waterDailyNorma = waterDailyNormaBar.dailyNorma)
    : (waterDailyNorma = 1.5);

  let percentDaily = 0;
  const dailyNorma = waterDailyNorma * 1000;
  function percentDailyCalc(waterDay, norma) {
    return Math.round((waterDay / norma) * 100);
  }
  const items = useSelector(selectWaterMonth);
  const data = useSelector(selectMonth);
  const selectedMonth = data.year + '-' + data.month;

  useEffect(() => {
    dispatch(getWaterMonth(selectedMonth));
  }, [dispatch, selectedMonth]);

  const days = eachDayOfInterval({
    start: startOfMonth(new Date(selectedMonth)),
    end: endOfMonth(new Date(selectedMonth)),
  });

  return (
    <ul className={css.listCalendar}>
      {days.map(day => {
        const item = items[day.getDate() - 1];
        if (!item) {
          return;
        }
        item.amount ? (percentDaily = percentDailyCalc(item.amount, dailyNorma)) : 0;
        return (
          <li className={css.itemCalendar} key={day}>
            <CalendarItem day={day} percentDaily={percentDaily} />
          </li>
        );
      })}
    </ul>
  );
};
