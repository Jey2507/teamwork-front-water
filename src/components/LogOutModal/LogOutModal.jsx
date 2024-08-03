import css from './LogOutModal.module.css';
import useModalContext from '../useModalContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast'; 

const LogOutModal = () => {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      closeModal();
      toast.success('Logged out successfully');
      navigate('/'); // Redirect to HomePage
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className={css.modalContainer}>
      <button className={css.closeButton} onClick={closeModal}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={css.coverText}>
        <h2 className={css.title}>Log Out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.buttonsCover}>
        <button
          className={css.logoutButton}
          onClick={handleLogout}
        >
          Log Out
        </button>
        <button className={css.cancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;