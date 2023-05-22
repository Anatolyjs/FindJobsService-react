import logo from './assets/img/logo.svg';
import styles from './Header.module.scss';

export const Logo = () => (
  <div className={styles.logo}>
    <img src={logo} alt="logo" />
    <h1 className={styles.name}>Jobored</h1>
  </div>
);
