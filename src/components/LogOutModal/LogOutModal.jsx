import css from './LogOutModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut, clearStore } from '../../redux/auth/operations';
import { closeModal } from '../../redux/ModalSlice';
import toast from 'react-hot-toast';
import sprite from '../../assets/sprite.svg'; 

const LogOutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  if (!isModalOpen) return null;

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      dispatch(clearStore());
      dispatch(closeModal());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className={css.modalContainer}>
      <button className={css.closeButton} onClick={() => dispatch(closeModal())}>
      <svg className="css.icon">
       <use xlinkHref={sprite + "#icon-x"} />
     </svg>
      </button>
      <div className={css.coverText}>
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
  );
};

export default LogOutModal;


