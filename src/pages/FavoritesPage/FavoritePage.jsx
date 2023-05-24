import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { EmptyPage } from "../../modules/EmptyPage/EmptyPage";
import { VacanciesList } from "../../modules/VacanciesList/VacanciesList";
import { Pagination } from "../../modules/Pagination/Pagination";

import styles from "./FavoritePage.module.scss";


export const FavoritePage = () => {
  const favorite = useSelector((state) => state.main.favorite);
  const [activePage, setActivePage] = useState(0);

  const pagesCount = Math.ceil(favorite?.length / 4);
  const pageSize = 4;
  let currentVacancies;

  const getCurrentArr = (items, pageSize, activePage) => {
    const startIndex = activePage * pageSize;
    const arr = [];
    for (let i = startIndex; i < startIndex + 4; i++) {
      if (i > items.length - 1) {
        break;
      }
      arr.push(items[i]);
    }
    return arr;
  }

  useEffect(() => {
    if (activePage >= pagesCount) {
      setActivePage(pagesCount - 1);
    }
  }, [favorite])

  if (favorite?.length) {
    currentVacancies = getCurrentArr(favorite, pageSize, activePage);
  }

  const onPageChange = (event) => {
    const pageNumber = event.selected;
    setActivePage(pageNumber);
  };

  const isPaginationShown = pagesCount > 1 && <div className={styles.footer}>{favorite.length && <Pagination pageCount={pagesCount} callbackFun={onPageChange} initialPage={activePage}/>}</div>;
  if (!favorite) {
    return (
      <div className={styles.emptyPage}>
        <EmptyPage />
        <div className={styles.button}>
          <NavLink to="/vacancies">Поиск Вакансий</NavLink>
        </div>
      </div>
    );
  }
  if (!favorite.length) {
    return (
      <div className={styles.emptyPage}>
        <EmptyPage />
        <div className={styles.button}>
          <NavLink to="/vacancies">Поиск Вакансий</NavLink>
        </div>
      </div>
    );
  }
  return (
    <section className={styles.favoritePage}>
      <div className={styles.body}>
        <VacanciesList vacancies={currentVacancies} />
      </div>
      {isPaginationShown}
    </section>
  );
};
