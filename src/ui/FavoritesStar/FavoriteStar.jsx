import styles from "./FavoriteStar.module.scss";
import favoriteStar from "./assets/img/FavoriteStar.svg";
import favoriteStarFullfilled from "./assets/img/FavoriteStarFullfilled.svg";

export const FavoriteStar = ({ dataElem, isActiveStar, callBack }) => {
  const activeImageStar = isActiveStar ? favoriteStarFullfilled : favoriteStar;

  const onStarClicked = (e) => {
    e.stopPropagation();
    callBack(!isActiveStar);
  };
  return (
    <button data-elem={dataElem} onClick={onStarClicked} className={styles.star}>
      <img src={activeImageStar} alt="favorite" />
    </button>
  );
};
