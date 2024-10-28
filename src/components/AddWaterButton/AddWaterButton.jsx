import { useState } from 'react';
import css from './AddWaterButton.module.css';
import Icons from '../../assets/sprite.svg';
import WaterModal from '../WaterModal/WaterModal';

export default function AddWaterButton({ mainColor, colorText, colorIcon }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
  <>
      <button className={css.wrapper} style={{ backgroundColor: mainColor }} onClick={openModal} >
        <div className={css.add_water_btn} style={{ color: colorText }}>
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
