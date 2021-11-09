import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavLink
          exact
          to="/"
          className={styles.link}
          activeClassName={styles["link--active"]}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/movies"
          className={styles.link}
          activeClassName={styles["link--active"]}
        >
          Movies
        </NavLink>
      </li>
    </ul>
    {/* <b className={styles.title}>Trending movies</b> */}
  </nav>
);

export default Navigation;
