import css from "./WaterProgressBar.module.css";

export default function WaterProgressBar() {
    let percentDaily = 60;

    return (
        <div className={css.container}>

            <p className={css.text}>Today</p>
            <div className={css.backBar}>
                <div className={css.frontBar} style={{
                    width: `${percentDaily}%`,
}}></div>
            </div>
            
            <ul className={css.percentage}>
                <li>0%</li>
                <li className={css.isInvisible}>10%</li>
                <li className={css.isInvisible}>20%</li>
                <li className={css.isInvisible}>30%</li>
                <li className={css.isInvisible}>40%</li>
                <li>50%</li>
                <li className={css.greenPercent}>60%</li>
                <li className={css.isInvisible}>70%</li>
                <li className={css.isInvisible}>80%</li>
                <li className={css.isInvisible}>90%</li>
                <li>100%</li>
            </ul>


        </div>
    )
}