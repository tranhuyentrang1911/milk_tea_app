import { Select } from "antd";
import React from "react";

import styles from "../field.module.scss";

const SelectField = (props: any) => {
  const { field, form, options, label, placeholder, disabled } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  console.log("value", value);
  const selectedOption = options.find((option: any) => option.value === value);

  const handleSelectedOptionChange = (selectedOption: any) => {
    // console.log("selectedOption", selectedOption);
    // const selectedValue = selectedOption
    //   ? selectedOption.value
    //   : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedOption,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <div className={styles.form_group}>
      {label && (
        <label htmlFor={name} className={styles.form_label}>
          {label}
        </label>
      )}

      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        className={showError ? styles.form_control_active : styles.form_control}
      />

      {showError && (
        <small className={styles.form_message}>{errors[name]}</small>
      )}
    </div>
  );
};

export default SelectField;
