import css from './AddWaterButton.module.css';
import Icons from '../../assets/sprite.svg';

export default function AddWaterButton({
  mainColor,
  backgroundColorIcon,
  colorText,
  colorIcon,
}) {
  return (
    <div className={css.wrapper} style={{ backgroundColor: mainColor }}>
      <button className={css.add_water_btn} style={{ color: colorText }}>
        
        <span className={css.btn_wrapper}>
          <span
            className={css.circle_btn}
            style={{ backgroundColor: backgroundColorIcon }}
          >
            <svg className={css.icon} stroke={colorIcon}>
              <use href={Icons + '#icon-x'}></use>
            </svg>
          </span>
          Add water
        </span>
      </button>
    </div>
  );
}