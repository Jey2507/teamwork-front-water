import { CalendarItem } from '../CalendarItem/CalendarItem';
import { format } from 'date-fns';
import css from './Calendar.module.css';


export const Calendar = ({ month, date, onClick, dayWaterMonth }) => {
  if (month.length === 0) return null;
  return (
    <ul className={css.listCalendar}>
      {month.map((day, index) => {
        return (
          <CalendarItem
            key={index}
            day={day}
            isActive={date === format(day, 'yyyy-MM-dd')}
            onClick={onClick}
            dayWaterMonth={dayWaterMonth}
          />
        );
      })}
    </ul>
  );
};
