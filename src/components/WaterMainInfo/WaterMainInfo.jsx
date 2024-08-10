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
import React, { useState } from 'react';
// import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
// import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import css from './WaterMainInfo.module.css';
import Logo from '../Logo/Logo.jsx';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import WaterModal from '../WaterModal/WaterModal';



export default function WaterMainInfo() {

    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className={css.container}>
      <div className={css.trackerLogo}>
        <Logo />
      </div>

      <img
        className={css.trackerImage}
        srcSet={`${tp1xmb} 262w, ${tp1xtb} 374w, ${tp1xdt} 472w, ${tp2xmb} 524w, ${tp2xtb} 748w, ${tp3xmb} 786w, ${tp2xdt} 944w, ${tp3xtb} 1122w, ${tp3xdt} 1416w`}
        src={tp1xmb}
        alt=""
      />
      <WaterDailyNorma />
      <WaterProgressBar />
      <div className={css.btn}>
        <AddWaterButton
          mainColor={'var(--main'}
          backgroundColorIcon={'none'}
          colorText={'var(--main-white'}
          colorIcon={'var(--main-white)'}
          openModal={openModal}
        />
              {isModalOpen && (
        <WaterModal
          operationType="add"
          onClose={closeModal}
        />
      )}
      </div>
    </section>
  );
}
