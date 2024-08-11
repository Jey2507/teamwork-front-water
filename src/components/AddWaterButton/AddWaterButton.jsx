// AddWaterButton.jsx
import React, { useState } from 'react';
import css from './AddWaterButton.module.css';
import Icons from '../../assets/sprite.svg';
import WaterModal from '../WaterModal/WaterModal';

export default function AddWaterButton({
  mainColor,
  backgroundColorIcon,
  colorText,
  colorIcon,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={css.wrapper} style={{ backgroundColor: mainColor }}>
        <button
          className={css.add_water_btn}
          style={{ color: colorText }}
          onClick={openModal}
        >
          <span className={css.btn_wrapper}>
            <span
              className={css.circle_btn}
              style={{ backgroundColor: backgroundColorIcon }}
            >
              <svg className={css.icon} stroke={colorIcon}>
                <use href={Icons + '#icon-x'}></use>
              </svg>
            </span>
            Add water
          </span>
        </button>
      </div>
      {isModalOpen && (
        <WaterModal
          operationType="add"
          onClose={closeModal}
        />
      )}
    </div>
  );
}
