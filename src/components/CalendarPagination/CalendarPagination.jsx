import css from './CalendarPagination.module.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { format, addMonths, subMonths, startOfMonth, formatDate } from 'date-fns';
import { icons as sprite } from '../../assets/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthStatistics, selectDate, selectMonth } from '../../redux/water/selectors.js';
import { setCurrentDate, setCurrentDay, setShowStatistic } from '../../redux/water/slice.js';
import { useMedia } from '../../hooks/useMedia.js';

export const CalendarPagination = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const currentDate = useSelector(selectMonth);
  const monthQuery = new Date(currentDate.year, currentDate.month - 1);
  const monthNext = new Date(currentDate.year, currentDate.month);
  const minDate = new Date('2020-01-01');
  const { isDesktop, isTablet } = useMedia();
  const isMonthStatistic = useSelector(getMonthStatistics);

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

  const isTodayVisible = () => {
    const today = selectedDate === new Date().toLocaleDateString('sv-SE');
    return today;
  };

  return (
    <div className={css.paginationSection}>
      {!isMonthStatistic ? (
        <p className={css.month}>Month</p>
      ) : (
        <p className={css.month}>Statistic</p>
      )}
      {(isDesktop || isTablet) && !isTodayVisible() && (
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
      )}

      <div className={css.chooseMonth}>
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

        <button
          className={`${css.statisticBtn} ${isMonthStatistic ? css.statisticBtnActive : ''}`}
          onClick={() =>
            isMonthStatistic ? dispatch(setShowStatistic(false)) : dispatch(setShowStatistic(true))
          }
        >
          <svg width="20" height="20">
            <use xlinkHref={`${sprite}#icon-pie-chart`} />
          </svg>
        </button>
      </div>
    </div>
  );
};
