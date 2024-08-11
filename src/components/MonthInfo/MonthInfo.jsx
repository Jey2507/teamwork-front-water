import { useState } from 'react';
import { CalendarPagination } from '../CalendarPagination/CalendarPagination.jsx';
import { Calendar } from '../Calendar/Calendar.jsx';
import css from './MonthInfo.module.css';

export const MonthInfo = () => {
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  return (
    <div className={css.calendar}>
      <CalendarPagination
        setIsActive={setIsActive}
        // currentDate={currentDate}
        // setCurrentDate={setCurrentDate}
        isActive={isActive}
      />
      <Calendar />
    </div>
  );
};
