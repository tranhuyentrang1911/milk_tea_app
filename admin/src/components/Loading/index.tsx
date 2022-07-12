import React from "react";
import styles from "./loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.modal} id="loading">
      <div>
        <img src={require("assets/images/logo/kOnzy.gif")} alt="" />
      </div>
    </div>
  );
};

export default Loading;
