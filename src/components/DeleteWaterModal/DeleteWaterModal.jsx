import css from './DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';
import { closeModal } from '../../redux/ModalSlice';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';

const DeleteWaterModal = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const entryId = useSelector((state) => state.modal.entryId);
  
    if (!isModalOpen) return null;
  
    const handleDelete = async () => {
      try {
        await dispatch(deleteWater(entryId)).unwrap();
        dispatch(closeModal());
        toast.success('Entry deleted successfully');
      } catch (error) {
        toast.error('Failed to delete entry');
      }
    };
  
    return (
      <Modal>
           <div className={css.modalContainer}>
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
      </Modal>
    );
  };
  
  export default DeleteWaterModal;

