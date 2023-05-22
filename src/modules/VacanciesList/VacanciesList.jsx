import { useMemo } from "react";
import { Vacancy } from "../../components/VacancyCart/Vacancy";
import styles from "./VacanciesList.module.scss";

export const VacanciesList = ({ vacancies }) => {
  const vacanciesArr = useMemo(() => {
    return vacancies.map((vacancy, index) => (
      <Vacancy key={index} vacancy={vacancy} />
    ));
  }, [vacancies]);

  return <section className={styles.vacanciesList}>{vacanciesArr}</section>;
};
