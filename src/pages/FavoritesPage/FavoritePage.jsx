import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


import { EmptyPage } from "../../modules/EmptyPage/EmptyPage";
import { VacanciesList } from "../../modules/VacanciesList/VacanciesList";
import styles from "./FavoritePage.module.scss";
import { Pagination } from "../../modules/Pagination/Pagination";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

  // if (favorite?.length) {

  //   const startIndex = (activePage - 1) * pageSize;
  //   let endIndex = startIndex + pageSize - 1;
  //   if (endIndex >= favorite?.length) {
  //     endIndex = favorite.length - 1;
  //   }
  //   currentVacancies = favorite.slice(startIndex, endIndex + 1);
  // }

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
