import css from './WaterItem.module.css';
import Icons from '../../assets/sprite.svg';
export default function WaterItem({ water }) {
  return (
    <div className={css.wrapper}>
      <svg className={css.glass_water_icon}>
        <use href={Icons + '#glass-water'}></use>
      </svg>
      <div>
        <p className={css.water_volume}>{water.volume}</p>
        <p className={css.water_time}>{water.time}</p>
      </div>
      <div className={css.btn_group}>
        <button className={css.button}>
          <svg className={css.icon}>
            <use href={Icons + '#icon-edit'}></use>
          </svg>
        </button>

        <button className={css.button}>
          <svg className={css.icon}>
            <use href={Icons + '#icon-trash'}></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
