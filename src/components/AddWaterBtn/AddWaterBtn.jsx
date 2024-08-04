import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import css from './AddWaterBtn.module.css';
import icons from '../../assets/icons/icons.svg';

const AddWaterBtn = () => {
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [operationType, setOperationType] = useState('add');

  const onOpenWaterModal = type => {
    setOperationType(type);
    setShowWaterModal(true);
  };

  const onCloseWaterModal = () => {
    setShowWaterModal(false);
  };

  return (
    <div>
      <button
        className={css.addWaterBtn}
        onClick={() => onOpenWaterModal('add')}
      >
        <svg className={css.addWaterIcon} width="16" height="16">
          <use href={`${icons}#icon-plus`} />
        </svg>
        Add water
      </button>
      {showWaterModal && (
        <WaterModal
          waterModalOpen={showWaterModal}
          closeWaterModal={onCloseWaterModal}
          operationType={operationType}
        />
      )}
    </div>
  );
};

export default AddWaterBtn;