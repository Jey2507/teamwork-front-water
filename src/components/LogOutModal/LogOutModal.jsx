import css from './LogOutModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../redux/ModalSlice';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import { logout } from '../../redux/auth/operations.js';
import Button from '../Button/Button.jsx';

const LogOutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(state => state.modal.isModalOpen);

  if (!isModalOpen) return null;

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(closeModal());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <Modal>
      <div className={css.modalContainer}>
        <div className={css.coverText}>
          <Button />
          <h2 className={css.title}>Log Out</h2>
          <p className={css.text}>Do you really want to leave?</p>
        </div>
        <div className={css.buttonsCover}>
          <button className={css.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
          <button className={css.cancelButton} onClick={() => dispatch(closeModal())}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
