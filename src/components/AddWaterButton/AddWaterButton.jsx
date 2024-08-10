
import css from './AddWaterButton.module.css';
import Icons from '../../assets/sprite.svg';


export default function AddWaterButton({
  mainColor,
  colorText,
  colorIcon,
  openModal
}) {


  return (
    <button className={css.wrapper} style={{ backgroundColor: mainColor }} onClick={openModal}>
      <div className={css.add_water_btn} style={{ color: colorText }}>
 
 
            <svg className={css.icon} stroke={colorIcon}>
              <use href={Icons + '#icon-x'}></use>
            </svg>
       <span className={css.text}>
          Add water
        </span>
      </div>
         
    </button >);
}