import { useDispatch, useSelector } from 'react-redux';
import css from './WaterItem.module.css';
import Icons from '../../assets/sprite.svg';
import { openModal } from '../../redux/ModalSlice';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../WaterModal/WaterModal';

export default function WaterItem({ water }) {
  const dispatch = useDispatch();
  const { isModalOpen, modalType, modalData } = useSelector(state => state.modal);

  const renderModal = () => {
    switch (modalType) {
      case 'DELETE_WATER':
        return <DeleteWaterModal />;
      case 'EDIT_WATER':
        return (
          <WaterModal
            operationType="edit"
            onClose={() => dispatch(closeModal())}
            water={modalData}
            timestampFromUrl={water.timestamp}
          />
        );
      default:
        return null;
    }
  };

  const handleEdit = () => {
    dispatch(openModal({
      type: 'EDIT_WATER',
      data: water
    }));
  };

  const handleDelete = () => {
    dispatch(openModal({
      type: 'DELETE_WATER',
      data: { entryId: water.id }
    }));
  };

  return (
    <div className={css.wrapper}>
      <svg className={css.glass_water_icon}>
        <use href={Icons + '#glass-water'}></use>
      </svg>
      <div>
        <p className={css.water_volume}>{water.volume}</p>
        <p className={css.water_time}>{water.time}</p>
      </div>
      <div className={css.btn_group}>
        <button className={css.button} onClick={handleEdit}>
          <svg className={css.icon}>
            <use href={Icons + '#icon-edit'}></use>
          </svg>
        </button>

        <button className={css.button} onClick={handleDelete}>
          <svg className={css.icon}>
            <use href={Icons + '#icon-trash'}></use>
          </svg>
        </button>
        {isModalOpen && renderModal()}
      </div>
    </div>
  );
}
