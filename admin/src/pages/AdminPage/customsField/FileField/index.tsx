import React from "react";

import styles from "../field.module.scss";

const FileField = (props: any) => {
  const { field, form, type, label, placeholder, disable } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleOnchange = (e: any) => {
    const file = e.target.files[0];
    console.log(form.values);
    const changeEvent = {
      target: {
        name: name,
        value: file,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <div className={styles.form_group}>
      {label && <label className={styles.form_label}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        disabled={disable}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={handleOnchange}
        className={showError ? styles.form_control_active : styles.form_control}
      />
      {showError && (
        <small className={styles.form_message}>{errors[name]}</small>
      )}
    </div>
  );
};
export default FileField;
