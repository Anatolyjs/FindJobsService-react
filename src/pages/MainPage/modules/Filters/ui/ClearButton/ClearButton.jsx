import styles from './ClearButton.module.scss';

export const ClearButton = ({callback}) => {
    return <button className={styles.button} onClick={callback}>Сбросить все</button>
}