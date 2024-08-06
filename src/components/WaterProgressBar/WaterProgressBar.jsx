import { selectDailyNorma } from "../../redux/auth/selectors";
import { selectPercentDay } from "../../redux/water/selectors";
import css from "./WaterProgressBar.module.css";
import { useSelector } from "react-redux";


export default function WaterProgressBar() {
    let percentDaily;
    function round10 (value) {
  return Math.round(value / 10) * 10;
}
    let percentDailyStore = 80.67;
        // useSelector(selectPercentDay);
    if (!percentDailyStore) {
        percentDaily = 0;
    }
    else { percentDaily = round10(percentDailyStore) }


    // let percentDaily = 40;

    return (
        <div className={css.container}>

            <p className={css.text}>Today</p>
            <div className={css.backBar}>
                <div className={css.frontBar} style={{
                    width: `${percentDaily}%`,
}}></div>
            </div>
            
            <ul className={css.percentage}>
                <li className={css.stablePercent}>0%</li>
                <li className={percentDaily === 10 ? css.greenPercent : css.isInvisible}>10%</li>
                <li className={percentDaily === 20 ? css.greenPercent : css.isInvisible}>20%</li>
                <li className={percentDaily === 30 ? css.greenPercent : css.isInvisible}>30%</li>
                <li className={percentDaily === 40 ? css.greenPercent : css.isInvisible}>40%</li>
                <li className={css.stablePercent}>50%</li>
                <li className={percentDaily === 60 ? css.greenPercent : css.isInvisible}>60%</li>
                <li className={percentDaily === 70 ? css.greenPercent : css.isInvisible}>70%</li>
                <li className={percentDaily === 80 ? css.greenPercent : css.isInvisible}>80%</li>
                <li className={percentDaily === 90 ? css.greenPercent : css.isInvisible}>90%</li>
                <li className={css.stablePercent}>100%</li>
            </ul>


        </div>
    )
}