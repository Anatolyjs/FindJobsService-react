import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pagination } from "../../modules/Pagination/Pagination";
import { VacanciesList } from "../../modules/VacanciesList/VacanciesList";
import { Filters } from "./modules/Filters/Filters";
import { SearchForm } from "./modules/SearchForm/SearchForm";
import { Loader } from "../../components/Loader/Loader";
import { fetchDefaultData, fetchVacancies, setCurrentVacanciesPage } from "../../redux/mainSlice";
import styles from "./MainPage.module.scss";


export const MainPage = () => {
  const vacancies = useSelector((state) => state.main.vacancies);
  const isLoading = useSelector((state) => state.main.isLoading);
  const currentVacanciesPage = useSelector(state => state.main.currentVacanciesPage);
  const dispatch = useDispatch();

  const pageCount = 125;

  useEffect(() => {
    dispatch(fetchDefaultData(currentVacanciesPage));
  }, []);

  const onPageChanged = (event) => {
    const pageNumber = event.selected;
    dispatch(fetchVacancies(pageNumber));

    if (currentVacanciesPage !== pageNumber) {
      dispatch(setCurrentVacanciesPage(pageNumber))
    }
  };

  if (!vacancies && isLoading) {
    return <Loader />;
  }

  if (!vacancies) {
    return <Loader />;
  }

  const isVacanciesLoading = isLoading ? (
    <Loader />
  ) : (
    <VacanciesList vacancies={vacancies} />
  );
  return (
    <section className={styles.mainPage}>
      <Filters />
      <div className={styles.vacancies}>
        <div className={styles.body}>
          <SearchForm />
          {isVacanciesLoading}
        </div>
        <div className={styles.pagination}>
          <Pagination
            callbackFun={onPageChanged}
            pageCount={pageCount}
            initialPage={currentVacanciesPage}
          />
        </div>
      </div>
    </section>
  );
};
