import cn from 'classnames';

import styles from './IndustrySelect.module.scss';

export const Option = ({activeOption, text, value, callback}) => {
    const onOptionClick = () => {
        callback({title: text, key: value});
    }
    const isActiveClass = activeOption?.title === text ? styles.option_active : '';
    
    return <div onClick={onOptionClick} className={cn(styles.option, isActiveClass)}>{text}</div>
}