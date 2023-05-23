import styles from "./SearchForm.module.scss";
import searchIcon from "./assets/img/searchIcon.svg";

export const SearchForm = ({onFilterApplied, callback, keyword, setKeyword}) => {
  
  const onFormSubmit = (event) => {
    event.preventDefault();
    onFilterApplied()
  }
  const onInputChange = (event) => {
    setKeyword(event.target.value);
  }
  return (
    <div className={styles.form}>
      <div className={styles.icon}>
        <img src={searchIcon} alt="searchIcon" />
      </div>
      <input data-elem='search-input' value={keyword} onChange={onInputChange} placeholder="Введите название вакансии" />
      <button data-elem='search-button' onClick={onFormSubmit} className={styles.button}>Поиск</button>
    </div>
  );
};
