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
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../WaterModal/WaterModal';
import { closeModal } from '../../redux/ModalSlice';

export default function WaterList() {
  const selectedDate = useSelector(selectDate);
  const waterAmount = useSelector(selectWaterDate) || [];
  const isLoading = useSelector(selectLoading);
  const { isModalOpen, modalType, modalData } = useSelector(state => state.modal);

  const dispatch = useDispatch();
  const { isMobile } = useMedia();
  const countWater = isMobile ? 2 : 3; // Number of skeleton elements for desktop and mobile versions

  useEffect(() => {
    dispatch(getWaterDay(selectedDate));
  }, [selectedDate, dispatch]);

  const renderModal = () => {
    if (!isModalOpen) return null;

    switch (modalType) {
      case 'DELETE_WATER':
        return <DeleteWaterModal/>;
      case 'EDIT_WATER':
        return (
          <WaterModal
            operationType="edit"
            onClose={() => dispatch(closeModal())}
            water={modalData?.water}
            timestampFromUrl={modalData?.timestampFromUrl}
          />
        );
      default:
        return null;
    }
  };

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

    return <p className={css.water_none}>No data for the selected date</p>;
  };

  return (
    <div>
      <ul className={css.water_list}>{renderContent()}</ul>
      {isModalOpen && renderModal()}
      </div>
  );
}
