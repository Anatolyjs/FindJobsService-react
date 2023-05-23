import { useNavigate } from "react-router-dom";

import styles from "./Vacancy.module.scss";
import { CityName } from "../../ui/CityName/CityName";
import { FavoriteStar } from "../../ui/FavoritesStar/FavoriteStar";
import { useDispatch } from "react-redux";
import { setVacancy, toggleFavorite } from "../../redux/mainSlice";


export const Vacancy = ({ vacancy }) => {
  let salary;
  const {
    id,
    town,
    profession,
    payment_from,
    payment_to,
    currency,
    type_of_work,
    isFavorite
  } = vacancy;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (payment_from && payment_to) {
    salary = `${payment_from} - ${payment_to} ${currency}`;
  }

  if (payment_from === 0 && payment_to === 0) {
    salary = `по договоренности`;
  }

  if (isNaN(payment_from) && isNaN(payment_to)) {
    salary = `не указана`;
  }

  if (!payment_from && payment_to) {
    salary = `${payment_to} ${currency}`;
  }

  if (payment_from && !payment_to) {
    salary = `от ${payment_from} ${currency}`;
  }

  const onVacancyClick = () => {
    dispatch(setVacancy(vacancy));
    navigate(`/vacancies/${id}`);
  }

  const onStarClick = () => {
    dispatch(toggleFavorite(id));
  }

  return (
    <article data-elem={`vacancy-${id}`} onClick={onVacancyClick} className={styles.vacancy}>
      <div className={styles.header}>
        <h2 className={styles.name}>{profession}</h2>
        <div className={styles.favoriteStar}>
          <FavoriteStar dataElem={`vacancy-${id}-shortlist-button`} isActiveStar={isFavorite} callBack={onStarClick} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.salary}>з/п {salary}</div>
        <div className={styles.point} />
        <div className={styles.schedule}>{type_of_work.title}</div>
      </div>
      <div className={styles.footer}>
        <CityName name={town.title} />
      </div>
    </article>
  );
};
