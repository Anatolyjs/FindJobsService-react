import { useState } from "react";
import cn from "classnames";

import styles from "./IndustrySelect.module.scss";
import { Option } from "./Option";
import { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

export const IndustrySelect = ({ setSelectedOption, selectedOption, catalogues }) => {
  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const ref = useRef(null);

  const onOptionClick = (catalog) => {
    setSelectedOption(catalog);
    setIsActiveSelect(false);
  };
  const onSelectClick = () => {
    setIsActiveSelect(!isActiveSelect);
  };

  const industryList = useMemo(() => catalogues.map((item) => (
    <Option
      activeOption={selectedOption}
      callback={onOptionClick}
      key={item.key}
      value={item.key}
      text={item.title}
    />
  )), [catalogues]);

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
    <div data-elem="industry-select" ref={ref} onClick={onSelectClick} className={cn( styles.industrySelect, isActiveSelect && styles.industrySelect_active)}>
      <div className={cn(styles.select, selectedOption && styles.select_selected)}>
        {initialSelectOption}
        <div className={styles.arrows}></div>
      </div>
      <div className={cn(styles.optionsContainer)}>{industryList}</div>
    </div>
  );
};
