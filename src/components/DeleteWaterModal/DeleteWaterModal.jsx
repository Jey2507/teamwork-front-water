import css from './DeleteWaterModal.module.css';
import useModalContext from '../useModalContext';
import { useDispatch } from 'react-redux';
// import { deleteWaterEntry } from '../../redux/water/operations';
import toast from 'react-hot-toast'; 

const DeleteWaterModal = ({ entryId }) => {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(entryId)).unwrap();
      closeModal();
      toast.success('Entry deleted successfully');
      // Тут викликати додаткові дії для оновлення інших компонентів
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };
   // svg вставити зі спрайту потім
  return (
    <div className={css.modalContainer}>
      <button className={css.closeButton} onClick={closeModal}>
        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg> */
        <svg className={css.icon}>
        <use xlinkHref="#icon-log-out"></use>
      </svg>
        }
      </button>
      <div className={css.coverText}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.buttonsCover}>
        <button className={css.deleteButton} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;