import clsx from 'clsx';
import css from './CalendarItem.module.css';
import { format, isSameDay } from 'date-fns';

export const CalendarItem = ({ day, isActive, onClick, dayWaterMonth }) => {
  const formatOfDate = format(day, 'yyyy-MM-dd');

  const runDayWater = dayWaterMonth.find(item => item.date === formatOfDate);

  const tempo = runDayWater ? runDayWater.percentageConsumed : '0%';

  const isCurrentDay = isSameDay(new Date(), day);

   
  const handleClick = () => {
    onClick(day);
  };

  return (
    <div className={css.item} onClick={handleClick}>
        <div
         className={clsx(css.number, {
          [css.active]: isActive,
          [css.current]: isCurrentDay && !isActive,
        })}
        >
       {format(day, 'd')}
       </div>
      <span className={css.tempo}>{tempo}</span>
    </div>
  );
};