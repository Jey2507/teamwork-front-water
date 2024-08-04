import Logo from "../Logo/Logo";
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma.jsx";

import css from "./WaterMainInfo.module.css"

export default function WaterMainInfo() {
    return (
        <section className={css.container}>
         <div className={css.logo}>
        <Logo styleBtn={false} />
      </div>
            <WaterDailyNorma />
            <WaterProgressBar />
      <AddWaterBtn />
        </section>
    )
}

