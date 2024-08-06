import css from "../AdvantagesSection/AdvantagesSection.module.css"

export default function AdvantagesSection({children}) {
    return  <div className={css.superMainBox}>
            {children}
            <div className={css.mainBox}>
                <div className={css.divHappy}>
                    <ul className={css.listHappy}>
                        <li className={css.itemHappy}></li>
                        <li className={css.itemHappy}></li>
                        <li className={css.itemHappy}></li>
                    </ul>
                    <p className={css.pHappy}>Our <span className={css.spanHappy}>happy</span> customers</p>
                </div>
                <ul className={css.list}>
                    <li className={css.firstItem}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#9BE1A0" />
                        </svg>
                        <p className={css.firstP}>Habit drive</p>
                    </li>
                    <li className={css.secondItem}>View statistics</li>
                    <li className={css.threeItem}>Personal rate setting</li>
                </ul>
            </div>
        </div>

}