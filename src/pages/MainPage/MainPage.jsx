import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Pagination } from "../../modules/Pagination/Pagination";
import { VacanciesList } from "../../modules/VacanciesList/VacanciesList";
import { Filters } from "./modules/Filters/Filters";
import { SearchForm } from "./modules/SearchForm/SearchForm";
import { Loader } from "../../components/Loader/Loader";
import { EmptyPage } from "../../modules/EmptyPage/EmptyPage";
import { clearFilters, fetchDefaultData, fetchVacancies, setCurrentVacanciesPage, setFilters } from "../../redux/mainSlice";

import styles from "./MainPage.module.scss";


export const MainPage = () => {
  const vacancies = useSelector((state) => state.main.vacancies);
  const totalVacancies = useSelector((state) => state.main.totalVacancies);
  const isLoading = useSelector((state) => state.main.isLoading);
  const currentVacanciesPage = useSelector((state) => state.main.currentVacanciesPage);
  const filters = useSelector((state) => state.main.filters);

  const [paymentFrom, setPaymentFrom] = useState(filters.paymentFrom);
  const [paymentTo, setPaymentTo] = useState(filters.paymentTo);
  const [selectedOption, setSelectedOption] = useState(filters.catalog);
  const [keyword, setKeyword] = useState(filters.keyword);

  const dispatch = useDispatch();

  const params = {
    paymentFrom,
    paymentTo,
    keyword,
    catalog: selectedOption?.key || "",
  };
  const pageCount = totalVacancies > 500 ? 125 : Math.ceil(totalVacancies / 4);

  useEffect(() => {
    dispatch(fetchDefaultData({ ...params, page: currentVacanciesPage }));
  }, []);

  const onFilterApplied = () => {
    dispatch(setFilters({ ...params, catalog: selectedOption }));
    if (!params.paymentFrom && !params.paymentTo && !params.keyword && !params.catalog && !vacancies?.length) {
      dispatch(fetchVacancies({ ...params, page: currentVacanciesPage }));
    }
 
    dispatch(setFilters({ ...params, catalog: selectedOption }));
    dispatch(fetchVacancies({ ...params, page: currentVacanciesPage }));
    dispatch(setCurrentVacanciesPage(0));
  };

  const clearAll = (event) => {
    event.preventDefault();
    setPaymentFrom("");
    setPaymentTo("");
    setSelectedOption("");
    setKeyword("");
    dispatch(clearFilters());
  };

  const onPageChanged = (event) => {
    const pageNumber = event.selected;
    if (currentVacanciesPage !== pageNumber) {
      params.page = pageNumber;
      dispatch(setCurrentVacanciesPage(pageNumber));
    }

    dispatch(fetchVacancies(params));
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
      <Filters
        onFilterApplied={onFilterApplied}
        clearAll={clearAll}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        paymentFrom={paymentFrom}
        setPaymentFrom={setPaymentFrom}
        setPaymentTo={setPaymentTo}
        paymentTo={paymentTo}
      />
      <div className={styles.vacancies}>
        <div className={styles.body}>
          <SearchForm
            onFilterApplied={onFilterApplied}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          {isVacanciesLoading}
          {!vacancies?.length && <EmptyPage />}
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
