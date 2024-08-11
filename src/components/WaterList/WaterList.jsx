import { useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterDay } from '../../redux/water/operations';
import {
  selectDate,
  selectWaterDate,
  selectLoading,
} from '../../redux/water/selectors';
import { WaterSkeleton } from '../DailyInfo/WaterSkeleton/WaterSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMedia } from '../../hooks/useMedia.js';

export default function WaterList() {
  const currentDay = useSelector(selectDate);
  const waterAmount = useSelector(selectWaterDate) || [];
  const isLoading = useSelector(selectLoading);

  const dispatch = useDispatch();

  const { isMobile } = useMedia();
  const countWater = isMobile ? 2 : 3; // Number of skeleton elements for desktop and mobile versions

  const renderContent = () => {
    if (isLoading) {
      return <WaterSkeleton countWater={countWater} />;
    }
    if (waterAmount.length) {
      return waterAmount.map(water => (
        <li key={water._id} className={css.water_item}>
          <WaterItem water={water} />
        </li>
      ));
    }

    return <p>No data for the selected date</p>;
  };

  useEffect(() => {
    dispatch(getWaterDay(currentDay));
  }, [currentDay, dispatch]);

  return <ul className={css.water_list}>{renderContent()}</ul>;
}
