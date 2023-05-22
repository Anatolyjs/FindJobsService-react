import location from "./assets/img/location.svg";
import styles from "./CityName.module.scss";

export const CityName = ({ name }) => {
  return (
    <div className={styles.cityName}>
      <div className={styles.location}>
        <img src={location} alt="location" />
      </div>
      <div>{name}</div>
    </div>
  );
};
