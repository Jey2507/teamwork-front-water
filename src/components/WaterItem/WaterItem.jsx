import { useDispatch, useSelector } from 'react-redux';
import css from './WaterItem.module.css';
import Icons from '../../assets/sprite.svg';
import { openModal } from '../../redux/ModalSlice';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

export default function WaterItem({ water }) {
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
