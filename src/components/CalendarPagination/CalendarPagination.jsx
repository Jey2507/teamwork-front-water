import css from './CalendarPagination.module.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { format, addMonths, subMonths, subYears, startOfMonth } from 'date-fns';
import { icons as sprite } from '../../assets/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth } from '../../redux/water/selectors.js';
import { setCurrentDate } from '../../redux/water/slice.js';

export const CalendarPagination = ({ isActive, setIsActive }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectMonth);
  const monthQuery = new Date(currentDate.year, currentDate.month - 1);
  const monthNext = new Date(currentDate.year, currentDate.month);
  // format(monthQuery, 'MMMM, yyyy')
  // let monthQuery = currentDate.year + '-' + currentDate.month;

  const minDate = new Date('2020-01-01');
  const handlePrevMonth = () => {
    let newMonth = subMonths(new Date(currentDate.year, currentDate.month), 1);
    console.log(newMonth);
    if (newMonth >= startOfMonth(minDate)) {
      console.log('Down');
      if (newMonth.getMonth() === 0) {
        console.log('December');
        newMonth = subYears(new Date(currentDate.year, 12), 1);
        // newMonth.setMonth(11);
      }
      // dispatch(setCurrentDate({ year: 2024, month: 7 }));
      dispatch(setCurrentDate({ year: newMonth.getFullYear(), month: newMonth.getMonth() }));
    }
  };
  const handleNextMonth = () => {
    if (monthQuery < new Date()) {
      console.log('Up');
      const newMonth = addMonths(new Date(currentDate.year, currentDate.month), 1);
      console.log(newMonth);
      dispatch(setCurrentDate({ year: newMonth.getFullYear(), month: newMonth.getMonth() }));
    }
    // console.log(monthQuery);
  };
  const isPrevDisabled = monthQuery <= startOfMonth(minDate);
  const isNextDisabled = monthNext > new Date();

  return (
    <div className={css.paginationSection}>
      {isActive ? <p className={css.month}>Month</p> : <p className={css.month}>Statistic</p>}
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
            <use xlinkHref={`${sprite}#pie-chart`} />
          </svg>
        </button>
      </div>
    </div>
  );
};
