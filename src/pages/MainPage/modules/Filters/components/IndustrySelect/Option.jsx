import cn from "classnames";

import styles from "./IndustrySelect.module.scss";

export const Option = ({ activeOption, text, value, callback }) => {
    
  const onOptionClick = () => {
    callback({ title: text, key: value });
  };

  const isActiveClass = activeOption?.title === text ? styles.option_active : "";

  return (
    <label onClick={onOptionClick} className={cn(styles.option, isActiveClass)}>
      <input
        type="radio"
        value={text}
        checked={activeOption.text === text}
        onChange={onOptionClick}
      />
      {text}
    </label>
  );
};
