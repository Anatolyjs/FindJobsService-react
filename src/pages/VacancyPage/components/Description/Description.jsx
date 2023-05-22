import styles from "./Description.module.scss";

export const Description = ({ text }) => {
  return (
    <section
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: text }}
    ></section>
  );
};
