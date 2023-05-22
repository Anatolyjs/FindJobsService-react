import { Logo } from "./Logo";
import { Navbar } from "./Navbar";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className={styles.header}>
          <Logo />
          <Navbar />
        </div>
      </div>
    </header>
  );
};
