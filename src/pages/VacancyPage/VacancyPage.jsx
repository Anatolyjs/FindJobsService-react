import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Loader } from "../../components/Loader/Loader";
import styles from "./VacancyPage.module.scss";

import { fetchVacancy, toggleLoader } from "../../redux/mainSlice";
import { Card } from "./components/Card/Card";
import { Description } from "./components/Description/Description";

export const VacancyPage = () => {
  const vacancy = useSelector((state) => state.main.vacancy);
  const isLoading = useSelector((state) => state.main.isLoading);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchVacancy(params.id));
  }, []);

  if (isLoading || !vacancy) {
    return <Loader />;
  }
  return (
    <section className={styles.vacancyPage}>
      <Card vacancy={vacancy} />
      <Description text={vacancy.vacancyRichText} />
    </section>
  );
};
