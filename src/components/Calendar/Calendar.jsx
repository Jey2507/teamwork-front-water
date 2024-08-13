import { CalendarItem } from '../CalendarItem/CalendarItem.jsx';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import css from './Calendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthStatistics, selectMonth, selectWaterMonth } from '../../redux/water/selectors.js';
import { useEffect } from 'react';
import { getWaterMonth } from '../../redux/water/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { LineChart, Line, CartesianGrid, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { setCurrentDay } from '../../redux/water/slice.js';

export const Calendar = () => {
  const selectWaterMonthInfo = useSelector(selectWaterMonth);
  const monthStatistic = [];

  selectWaterMonthInfo.map(item => {
    monthStatistic.push({ day: item.date.slice(-2), amount: item.amount });
  });
  console.log(monthStatistic);

  const dispatch = useDispatch();
  const isMonthStatistic = useSelector(getMonthStatistics);
  let waterDailyNormaBar = useSelector(selectUser);
  let waterDailyNorma;
  waterDailyNormaBar !== null
    ? (waterDailyNorma = waterDailyNormaBar.dailyNorma)
    : (waterDailyNorma = 1.5);

  let percentDaily = 0;
  const dailyNorma = waterDailyNorma * 1000;
  function percentDailyCalc(waterDay, norma) {
    return Math.round((waterDay / norma) * 100);
  }
  const items = useSelector(selectWaterMonth);
  const data = useSelector(selectMonth);
  const selectedMonth = data.year + '-' + data.month;
  const formatYAxis = value => {
    return value === 0
      ? `${value}%`
      : value % 1 === 0
      ? `${(value / 1000).toFixed(1)} L`
      : `${(value / 1000).toFixed(1)} L`;
  };

  useEffect(() => {
    dispatch(getWaterMonth(selectedMonth));
  }, [dispatch, selectedMonth]);

  const days = eachDayOfInterval({
    start: startOfMonth(new Date(selectedMonth)),
    end: endOfMonth(new Date(selectedMonth)),
  });

  return (
    <div>
      {!isMonthStatistic ? (
        <ul className={css.listCalendar}>
          {days.map(day => {
            const item = items[day.getDate() - 1];
            if (!item) {
              return;
            }
            percentDaily = percentDailyCalc(item.amount, dailyNorma);
            percentDaily > 100 ? (percentDaily = 100) : percentDaily;
            return (
              <li className={css.itemCalendar} key={day}>
                <CalendarItem day={day} percentDaily={percentDaily} />
              </li>
            );
          })}
        </ul>
      ) : (
        <AreaChart
          width={640}
          height={300}
          data={monthStatistic}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="3%" stopColor="#9be1a0" stopOpacity={1} />
              <stop offset="75%" stopColor="#9be1a0" stopOpacity={0.8} />
              <stop offset="99%" stopColor="#9be1a0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tickCount={11} interval={3} />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={40}
            padding={{ bottom: 5 }}
            tickFormatter={formatYAxis}
            tickCount={6}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#9be1a0"
            fillOpacity={1}
            fill="url(#colorPv)"
            activeDot={{ r: 9 }}
          />
        </AreaChart>
      )}
    </div>
  );
};
