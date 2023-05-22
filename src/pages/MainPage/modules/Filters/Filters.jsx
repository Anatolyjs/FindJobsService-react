import styles from './Filters.module.scss';

export const Filters = () => {
    return <form className={styles.filters}>
        <div className={styles.header}>
        <h2 className={styles.title}>Фильтры</h2>
        </div>
    </form>
}