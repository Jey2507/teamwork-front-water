import { useEffect } from 'react';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';

import css from './WaterDetailedInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterMonthly } from '../../redux/water/operations.js';
import { selectCalendar } from '../../redux/calendar/selector.js';
import { selectAllWaterByDay } from '../../redux/water/selectors.js'; // додав ByDay
import { selectLoading } from '../../redux/water/selectors';
import Loader from '../Loader/Loader.jsx';

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();
  const currentMonth = useSelector(selectCalendar).split('T')[0];
  const allWater = useSelector(selectAllWaterByDay);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getWaterMonthly(currentMonth));
  }, [dispatch, currentMonth, allWater]);

  return (
    <>
      <Loader loading={loading} />
      <div className={css.trackContainerItem}>
        <UserPanel />
        <DailyInfo />
        <MonthInfo />
      </div>
    </>
  );
};

export default WaterDetailedInfo;