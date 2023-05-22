import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { EmptyPage } from "../../modules/EmptyPage/EmptyPage";
import { VacanciesList } from "../../modules/VacanciesList/VacanciesList";
import styles from "./FavoritePage.module.scss";
import { Pagination } from "../../modules/Pagination/Pagination";

export const FavoritePage = () => {
  const favorite = useSelector((state) => state.main.favorite);

  if (!favorite) {
    return <EmptyPage />;
  }
  if (!favorite.length) {
    return <EmptyPage />;
  }
  return (
    <section className={styles.favoritePage}>
      <div className={styles.body}>
        <VacanciesList vacancies={favorite} />
      </div>
      <div className={styles.footer}>{favorite.length && <Pagination />}</div>
    </section>
  );
};
