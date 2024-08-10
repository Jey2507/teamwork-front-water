import { useState } from 'react';
import css from './AddWaterBtn.module.css';
import Icons from '../../../assets/sprite.svg';
import WaterModal from '../../WaterModal/WaterModal';
export default function AddWaterBtn({
  smallBtn,
  mainColor,
  backgroundColorIcon,
  colorText,
  colorIcon,
  hoverBackgroundColorIcon,
  hoverColorIcon,
  hoverText,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className={smallBtn ? css.nowraper : css.wrapper}
      style={{ backgroundColor: mainColor }}
    >
      <button
        className={css.add_water_btn}
        style={{ color: isHovered ? hoverText : colorText }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenModal}
      >
        <span className={css.btn_wrapper}>
          <span
            className={css.circle_btn}
            style={{
              backgroundColor: isHovered
                ? hoverBackgroundColorIcon
                : backgroundColorIcon,
            }}
          >
            <svg
              className={css.icon}
              stroke={isHovered ? hoverColorIcon : colorIcon}
            >
              <use href={Icons + '#icon-x'}></use>
            </svg>
          </span>
          <span>Add water</span>
        </span>
      </button>
      {isModalOpen && (
        <WaterModal operationType="add" onClose={handleCloseModal} />
      )}
    </div>
  );
}
