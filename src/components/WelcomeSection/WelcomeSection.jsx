import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import css from "../WelcomeSection/WelcomeSection.module.css"

export default function WelcomeSection() {
    return <div className={css.mainBox}>
        <Logo />
        <div className={css.div}>
            <div className={css.divText}>
                <p className={css.descr}>Record daily water intake and track</p>
                <h1 className={css.mainText}>Water consumption tracker</h1>
            </div>
            <ul className={css.list}>
                <li>
                    <NavLink className={css.firstNav} to="/tracker">Try tracker</NavLink>
                </li>
                <li>
                    <NavLink className={css.secondNav} to="/signin">Sign In</NavLink>
                </li>
            </ul>
        </div>
    </div>
}