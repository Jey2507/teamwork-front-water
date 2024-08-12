import { useState } from 'react';
import css from './AddWaterButton.module.css';
import Icons from '../../assets/sprite.svg';
import WaterModal from '../WaterModal/WaterModal';
import { selectDate } from '../../redux/water/selectors';
import { useSelector } from 'react-redux';
import { isToday, parseISO } from 'date-fns';

export default function AddWaterButton({ mainColor, colorText, colorIcon }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const selectedData = useSelector(selectDate);

  const parsedDate = parseISO(selectedData);
  const isTodayData = isToday(parsedDate);
  return (
  <>
      <button className={css.wrapper} style={{ backgroundColor: mainColor }} onClick={openModal} disabled={!isTodayData}>
        <div className={!isTodayData ? css.add_water_btn_disabled : css.add_water_btn} style={{ color: colorText }}>
          <svg className={css.icon} stroke={colorIcon}>
            <use href={Icons + '#icon-x'}></use>
          </svg>
          <span className={css.text}>Add water</span>
        </div>
      </button>
      {isModalOpen && <WaterModal operationType="add" onClose={closeModal} />}
    </>
  );
}
