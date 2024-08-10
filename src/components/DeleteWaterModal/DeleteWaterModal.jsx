import { useDispatch, useSelector } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';
import { closeModal } from '../../redux/ModalSlice';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal'; // 
import css from './DeleteWaterModal.module.css';

const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const entryId = useSelector((state) => state.modal.entryId);

  const handleDelete = async () => {
    try {
      await dispatch(deleteWater(entryId)).unwrap();
      dispatch(closeModal());
      toast.success('Entry deleted successfully');
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <div className={css.modalContainer}>
        <div className={css.coverText}>
          <h2 className={css.title}>Delete entry</h2>
          <p className={css.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={css.buttonsCover}>
          <button className={css.deleteButton} onClick={handleDelete}>
            Delete
          </button>
          <button className={css.cancelButton} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;



/* const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const entryId = useSelector((state) => state.modal.entryId); 

  if (!isModalOpen) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(entryId)).unwrap();
      dispatch(closeModal());
      toast.success('Entry deleted successfully');
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  return (
    <div className={css.modalContainer}>
      <button className={css.closeButton} onClick={() => dispatch(closeModal())}>
      <svg className={css.icon}>
          <use xlinkHref="#icon-x" />
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

 */