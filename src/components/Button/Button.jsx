import { useDispatch } from "react-redux";
import { closeModal } from '../../redux/ModalSlice';
import sprite from '../../assets/sprite.svg'; 
import css from '../Button/Button.module.css';

export default function Button() {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
      };

    return <button className={css.closeButton} onClick={handleClose}>
    <svg className={css.icon}>
      <use xlinkHref={`${sprite}#icon-x`} />
    </svg>
  </button>
}