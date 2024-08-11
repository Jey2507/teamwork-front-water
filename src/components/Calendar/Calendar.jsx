import { CalendarItem } from '../CalendarItem/CalendarItem.jsx';
import { startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import css from './Calendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth, selectWaterMonth } from '../../redux/water/selectors.js';
import { useEffect } from 'react';
import { getWaterMonth } from '../../redux/water/operations.js';

export const Calendar = () => {
  const data = useSelector(selectMonth);
  const selectedMonth = data.year + '-' + data.month;
  const dispatch = useDispatch();
  const monthData = useSelector(selectWaterMonth);

  useEffect(() => {
    dispatch(getWaterMonth(selectedMonth));
  }, [dispatch, selectedMonth]);

  const days = eachDayOfInterval({
    start: startOfMonth(new Date(selectedMonth)),
    end: endOfMonth(new Date(selectedMonth)),
  });

  return (
    <div>
      <ul className={css.listCalendar}>
        {days.map(day => {
          return (
            <li className={css.itemCalendar} key={day}>
              <CalendarItem day={day} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
