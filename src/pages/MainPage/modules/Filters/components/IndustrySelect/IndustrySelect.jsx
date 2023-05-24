import { useState } from "react";
import cn from "classnames";

import styles from "./IndustrySelect.module.scss";
import { Option } from "./Option";
import { useRef } from "react";
import { useEffect } from "react";

export const IndustrySelect = ({
  setSelectedOption,
  selectedOption,
  catalogues,
}) => {
  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const ref = useRef(null);

  const onOptionClick = (catalog) => {
    setSelectedOption(catalog);
  };
  const onSelectClick = () => {
    setIsActiveSelect(!isActiveSelect);
  };

  const industryList = catalogues.map((item) => (
    <Option
      activeOption={selectedOption}
      callback={onOptionClick}
      key={item.key}
      value={item.key}
      text={item.title}
    />
  ));
  const isOptionsActive = isActiveSelect && (
    <ul className={styles.optionsContainer}>{industryList}</ul>
  );
  const initialSelectOption = selectedOption?.title || "Выберите отрасль";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsActiveSelect(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} onClick={onSelectClick} className={cn( styles.industrySelect, isActiveSelect && styles.industrySelect_active )}>
      <div className={cn(styles.select, selectedOption && styles.select_selected)} >
        {initialSelectOption}
        <div className={styles.arrows}></div>
      </div>
      {isOptionsActive}
    </div>
  );
};
