import css from './CalendarPagination.module.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { format, addMonths, subMonths, startOfMonth, formatDate } from 'date-fns';
import { icons as sprite } from '../../assets/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectMonth } from '../../redux/water/selectors.js';
import { setCurrentDate, setCurrentDay } from '../../redux/water/slice.js';

export const CalendarPagination = ({ isActive, setIsActive }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectMonth);
  const monthQuery = new Date(currentDate.year, currentDate.month - 1);
  const monthNext = new Date(currentDate.year, currentDate.month);
  const minDate = new Date('2020-01-01');

  const handlePrevMonth = () => {
    let newMonth;
    if (currentDate.month == 1) {
      const setYear = currentDate.year - 1;
      const setMonth = 12;
      dispatch(setCurrentDate({ year: setYear, month: setMonth }));
    } else {
      newMonth = subMonths(new Date(currentDate.year, currentDate.month), 1);
      dispatch(setCurrentDate({ year: newMonth.getFullYear(), month: newMonth.getMonth() }));
    }
  };
  const handleNextMonth = () => {
    if (monthQuery < new Date()) {
      let newMonth;
      if (currentDate.month == 11) {
        const setYear = currentDate.year;
        const setMonth = 12;
        dispatch(setCurrentDate({ year: setYear, month: setMonth }));
      } else {
        newMonth = addMonths(new Date(currentDate.year, currentDate.month), 1);
        dispatch(setCurrentDate({ year: newMonth.getFullYear(), month: newMonth.getMonth() }));
      }
    }
  };
  const isPrevDisabled = monthQuery <= startOfMonth(minDate);
  const isNextDisabled = monthNext > new Date();

  return (
    <div className={css.paginationSection}>
      {isActive ? <p className={css.month}>Month</p> : <p className={css.month}>Statistic</p>}
      <button
        className={css.today_btn}
        onClick={() => {
          const date = formatDate(new Date(), 'yyyy-MM-dd');
          dispatch(
            setCurrentDate({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
          );
          dispatch(setCurrentDay(date));
        }}
      >
        Today
      </button>
      <div className={css.chooseMonth}>
        {isActive ? (
          <>
            <button className={css.button} disabled={isPrevDisabled} onClick={handlePrevMonth}>
              <BsChevronLeft className={isPrevDisabled ? css.chevronDisabled : css.chevron} />
            </button>
            <span className={css.span}>{format(monthQuery, 'MMMM, yyyy')}</span>
            <button
              className={isNextDisabled ? css.buttonDisabled : css.button}
              onClick={handleNextMonth}
              disabled={isNextDisabled}
            >
              <BsChevronRight className={isNextDisabled ? css.chevronDisabled : css.chevron} />
            </button>
          </>
        ) : null}

        <button
          className={`${css.statisticBtn} ${!isActive ? css.statisticBtnActive : ''}`}
          onClick={() => setIsActive(!isActive)}
        >
          <svg width="20" height="20">
            <use xlinkHref={`${sprite}#icon-pie-chart`} />
          </svg>
        </button>
      </div>
    </div>
  );
};
