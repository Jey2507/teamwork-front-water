import { CalendarPagination } from '../CalendarPagination/CalendarPagination.jsx';
import { Calendar } from '../Calendar/Calendar.jsx';
import css from './MonthInfo.module.css';

export const MonthInfo = () => {
  return (
    <div className={css.calendar}>
      <CalendarPagination />
      <Calendar />
    </div>
  );
};
