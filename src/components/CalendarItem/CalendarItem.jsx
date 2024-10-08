import toast from 'react-hot-toast';
import { selectDate, selectWaterDate } from '../../redux/water/selectors';
import css from './CalendarItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { format, formatDate, isSameDay } from 'date-fns';
import { setCurrentDay } from '../../redux/water/slice';

export const CalendarItem = ({ day, percentDaily }) => {
  const dispatch = useDispatch();
  const waterDate = useSelector(selectWaterDate);
  const selectedData = useSelector(selectDate);

  const handleDayClick = () => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const utcDate = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
    const offset = timezoneOffset * 60 * 1000;
    const dateWithOffset = utcDate - offset;

    if (dateWithOffset > Date.now() - offset)
      return toast.error('Can`t get water from the future.', {
        duration: 5000,
        position: 'top-center',
        style: {
          textAlign: 'center',
          boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
        },
      });

    if (isSameDay(waterDate, utcDate - offset))
      return toast.error(`Your water is already from ${format(new Date(waterDate), 'd, MMMM')}`, {
        duration: 5000,
        position: 'top-center',
        style: {
          textAlign: 'center',
          boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
        },
      });
    const NewDate = new Date(dateWithOffset);
    const result = formatDate(NewDate, 'yyyy-MM-dd');
    dispatch(setCurrentDay(result));
  };
  const isFullConsumption = percentDaily === 100;
  const isToday = isSameDay(day, new Date());
  const isSelected = isSameDay(day, selectedData);
  const getDayStyles = (isFullConsumption, isToday, isSelected) => {
    if (isFullConsumption && isSelected) {
      return {
        backgroundColor: '#323F47',
        color: '#9BE1A0',
        border: 'none',
      };
    }
    if (isFullConsumption) {
      return {
        backgroundColor: '#FFFFFF',
        border: 'none',
      };
    }
    if (isToday && isSelected) {
      return {
        backgroundColor: '#323F47',
        color: '#9BE1A0',
      };
    }
    if (isSelected) {
      return {
        backgroundColor: '#323F47',
        color: '#9BE1A0',
        border: '2px solid #323F47',
      };
    }
    return {};
  };

  const styles = getDayStyles(isFullConsumption, isToday, isSelected);

  return (
    <div>
      <button
        className={css.button}
        style={{ ...styles }}
        onClick={() => {
          handleDayClick();
        }}
      >
        <div className={css.number}>{day.getDate()}</div>
      </button>
      <div className={css.percentage}>{percentDaily}%</div>
    </div>
  );
};
