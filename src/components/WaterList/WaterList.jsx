import { useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterDay } from '../../redux/water/operations';
import { selectDate, selectWaterDay } from '../../redux/water/selectors';

export default function WaterList() {
  const currentDay = useSelector(selectDate);
  const waterAmount = useSelector(selectWaterDay);

  console.log('water', waterAmount);
  console.log('currentDay', currentDay);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWaterDay(currentDay));
  }, [currentDay, dispatch]);

  return (
    <ul className={css.water_list}>
      {/* {.map(water => (
        <li key={water.id} className={css.water_item}>
          <WaterItem water={water} />
        </li>
      ))} */}
    </ul>
  );
}
