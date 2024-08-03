// import Logo from "../Logo/Logo";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma.jsx";

import css from "./WaterMainInfo.module.css"

export default function WaterMainInfo() {
    return (
        <section className={css.container}>
         
            <WaterDailyNorma/>
        </section>
    )
};