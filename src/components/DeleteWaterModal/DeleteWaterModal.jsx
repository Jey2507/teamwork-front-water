import css from './DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterEntry } from '../../redux/water/operations';
import { closeModal } from '../../redux/ModalSlice';
import toast from 'react-hot-toast';



const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const entryId = useSelector((state) => state.modal.entryId); // Використовуйте entryId, якщо його зберігаєте в state.modal

  if (!isModalOpen) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(entryId)); //  entryId для видалення конкретного запису
      dispatch(closeModal());
      toast.success('Entry deleted successfully');
      // Додати логіку для оновлення компонентів WaterProgressBar, WaterList та Calendar
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  return (
    <div className={css.modalContainer}>
      <button className={css.closeButton} onClick={() => dispatch(closeModal())}>
      <svg className={css.icon}>
      <symbol id="icon-x" viewBox="0 0 32 32">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.429" d="M24 8 8 24M8 8l16 16"/>
        </symbol>
        </svg>
      </button>
      <div className={css.coverText}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.buttonsCover}>
        <button className={css.deleteButton} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelButton} onClick={() => dispatch(closeModal())}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;

