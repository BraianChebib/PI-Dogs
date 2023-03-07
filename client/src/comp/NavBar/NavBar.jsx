import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/form" className={style.button}>
        CREAR
      </Link>
    </div>
  );
};

export default NavBar;
