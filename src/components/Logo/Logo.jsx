import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <NavLink className={css.homePageLogo} to="/">
      AquaTrack
    </NavLink>
  );
};

export default Logo;
