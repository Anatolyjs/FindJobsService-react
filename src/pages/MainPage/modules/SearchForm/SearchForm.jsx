import styles from "./SearchForm.module.scss";
import searchIcon from "./assets/img/searchIcon.svg";

export const SearchForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.icon}>
        <img src={searchIcon} alt="searchIcon" />
      </div>
      <input placeholder="Введите название вакансии" />
      <button className={styles.button}>Поиск</button>
    </form>
  );
};
