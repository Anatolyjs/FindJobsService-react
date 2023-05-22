import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

export const Navbar = () => (
  <nav className={styles.navbar}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavLink to='/vacancies'>Поиск Вакансий</NavLink>
      </li>
      <li className={styles.item}>
        <NavLink to='/favorite'>Избранное</NavLink>
      </li>
    </ul>
  </nav>
);

