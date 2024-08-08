import { useDispatch, useSelector } from 'react-redux';
import css from './WaterItem.module.css';
import Icons from '../../assets/sprite.svg';
import { openModal } from '../../redux/ModalSlice';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

export default function WaterItem({ amount, date }) {
  const dispatch = useDispatch();
  const { isModalOpen, modalType } = useSelector(state => state.modal);

  const renderModal = () => {
    switch (modalType) {
      case 'DELETE_WATER':
        return <DeleteWaterModal />;
      default:
        return null;
    }
  };

  const handleDelete = () => {
    dispatch(openModal({ type: 'DELETE_WATER', data: { entryId: 1 } }));
  };

  const formatTime = (dateString) => {
    const dateObj = new Date(dateString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={css.wrapper}>
      <svg className={css.glass_water_icon}>
        <use href={Icons + '#glass-water'}></use>
      </svg>
      <div>
        <p className={css.water_volume}>{amount} ml</p>
        <p className={css.water_time}>{formatTime(date)}</p>
      </div>
      <div className={css.btn_group}>
        <button className={css.button}>
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
