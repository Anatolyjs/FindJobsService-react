import styles from './SalaryInput.module.scss';

export const SalaryInput = ({ isPaymentFrom, payment, setPayment}) => {
    const amountStep = 1000;
    const placeholder = isPaymentFrom ? 'От' : 'До';

    const onInputChange = (event) => {
        if (event.target.value === '') {
            return setPayment('');
        }
        setPayment(+event.target.value);
    }

    const increasePayment = () => {
        setPayment(+payment + amountStep);
    }
    const decreasePayment = () => {
        if (+payment - amountStep > 0) {
            return setPayment(payment - amountStep);
        } 
        setPayment('');
    }

    return <div className={styles.salaryInput}>
        <input type='number' value={payment} onChange={onInputChange} placeholder={placeholder} className={styles.input}/>
        <div onClick={increasePayment} className={styles.buttonIncrease} />
        <div onClick={decreasePayment}  className={styles.buttonDecrease} />
    </div>
}