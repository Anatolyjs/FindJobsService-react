import { useDispatch } from "react-redux";

import { CityName } from "../../../../ui/CityName/CityName";
import { FavoriteStar } from "../../../../ui/FavoritesStar/FavoriteStar";
import { toggleFavorite } from "../../../../redux/mainSlice";
import styles from "./Card.module.scss";

export const Card = ({ vacancy }) => {
  let salary;
  const {
    id,
    town,
    profession,
    payment_from,
    payment_to,
    currency,
    type_of_work,
    isFavorite,
  } = vacancy;
  const dispatch = useDispatch();

  if (payment_from && payment_to) {
    salary = `${payment_from} - ${payment_to} ${currency}`;
  }

  if (!payment_from && !payment_to) {
    salary = `не указана`;
  }

  if (!payment_from && payment_to) {
    salary = `${payment_to} ${currency}`;
  }

  if (payment_from && !payment_to) {
    salary = `от ${payment_from} ${currency}`;
  }

  const onStarClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.name}>{profession}</h2>
        <FavoriteStar isActiveStar={isFavorite} callBack={onStarClick} />
      </div>
      <div className={styles.body}>
        <div className={styles.salary}>з/п {salary}</div>
        <div className={styles.point} />
        <div className={styles.schedule}>{type_of_work.title}</div>
      </div>
      <div className={styles.footer}>
        <CityName name={town.title} />
      </div>
    </section>
  );
};
