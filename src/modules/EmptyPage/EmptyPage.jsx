import { NavLink } from "react-router-dom";
import styles from "./EmptyPage.module.scss";
import emptyMan from "./assets/img/emptyMan.svg";

export const EmptyPage = () => {
  return (
    <section className={styles.emptyPage}>
      <img className={styles.image} src={emptyMan} alt="emptyMan"/>
        <div className={styles.text}>Упс, здесь еще ничего нет!</div>
    </section>
  );
};
