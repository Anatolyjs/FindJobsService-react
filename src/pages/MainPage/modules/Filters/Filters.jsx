import { useSelector } from "react-redux";

import styles from "./Filters.module.scss";
import { IndustrySelect } from "./components/IndustrySelect/IndustrySelect";
import { ClearButton } from "./ui/ClearButton/ClearButton";
import { SalaryInput } from "./components/SalaryInput/SalaryInput";

export const Filters = ({onFilterApplied, clearAll, setSelectedOption, selectedOption, paymentFrom, setPaymentFrom, setPaymentTo, paymentTo}) => {
  const catalogues = useSelector((state) => state.main.catalogues);
  const onButtonClick = (event) => {
    event.preventDefault();
    onFilterApplied();
  }
  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h2 className={styles.title}>Фильтры</h2>
        <ClearButton callback={clearAll}/>
      </div>
      <div className={styles.body}>
        <div className={styles.industry}>
          <h3 className={styles.itemTitle}>Отрасль</h3>
          <IndustrySelect setSelectedOption={setSelectedOption} selectedOption={selectedOption} catalogues={catalogues} />
        </div>
        <div className={styles.salary}>
          <h3 className={styles.itemTitle}>Оклад</h3>
          <div className={styles.inputMin}>
            <SalaryInput dataElem='salary-from-input' isPaymentFrom={true} payment={paymentFrom} setPayment={setPaymentFrom}/>
          </div>
          <div className={styles.inputMax}>
            <SalaryInput dataElem='salary-to-input' isPaymentFrom={false} payment={paymentTo} setPayment={setPaymentTo}/>
          </div>
        </div>
        <button onClick={onButtonClick} className={styles.button}>Применить</button>
      </div>
    </div>
  );
};
