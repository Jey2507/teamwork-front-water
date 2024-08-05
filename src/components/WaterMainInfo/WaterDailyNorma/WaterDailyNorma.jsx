import { useSelector } from "react-redux";
import css from "./WaterDailyNorma.module.css"

export default function WaterDailyNorma ()  {
    return (
        <div className={css.container}>
            <p className={css.norma}>redux</p>
            <p className={css.text}>My daily norma</p>
           
        </div>
    )
}


