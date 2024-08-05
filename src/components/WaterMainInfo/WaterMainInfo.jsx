import {
  tp1xdt,
  tp2xdt,
  tp3xdt,
  tp1xtb,
  tp2xtb,
  tp3xtb,
  tp1xmb,
  tp2xmb,
  tp3xmb,
} from '../../images/TrackerPage/index.js';
import AddWaterButton from '../AddWaterButton/AddWaterButton.jsx';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import css from './WaterMainInfo.module.css';

export default function WaterMainInfo() {
  return (
    <section className={css.container}>
      {/* Потім замість цього буде компонент ЛОГО */}
      <div className={css.logo}>AQUATRACK</div>
      <img
        srcSet={`${tp1xmb} 262w, ${tp1xtb} 374w, ${tp1xdt} 472w, ${tp2xmb} 524w, ${tp2xtb} 748w, ${tp3xmb} 786w, ${tp2xdt} 944w, ${tp3xtb} 1122w, ${tp3xdt} 1416w`}
        src={tp1xmb}
        alt=""
      />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterButton />
    </section>
  );
}
