import { useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterDay } from '../../redux/water/operations';
import { selectDate, selectWaterDate } from '../../redux/water/selectors';

export default function WaterList() {
  const currentDay = useSelector(selectDate);
  const waterAmount = useSelector(selectWaterDate) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWaterDay(currentDay));
  }, [currentDay, dispatch]);

  // const value = Object.keys(waterAmount).length;

  return (
    <ul className={css.water_list}>
      {waterAmount.length ? (
        waterAmount.map(water => (
          <li key={water._id} className={css.water_item}>
            <WaterItem water={water} />
          </li>
        ))
      ) : (
        <p>No data for the selected date</p>
      )}
    </ul>
  );
}
