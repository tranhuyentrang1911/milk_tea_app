import { Modal } from "antd";
import React, { useState } from "react";
import { handlePrice } from "utils";

import styles from "../productList.module.scss";
interface ProductItemProps {
  key: string | number | undefined;
  id: string | number | undefined;
  img: string;
  name: string;
  price: number;
}
const ProductItem = (props: ProductItemProps) => {
  const { id, name, img, price } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const form: HTMLElement | null = document.querySelector("#formSignIn");
    if (form) {
      form.style.display = "flex";
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={styles.main_item}>
        <div className={styles.img}>
          <img
            alt="error"
            src={require(`../../../../../assets/images/products/${img}`)}
          />
        </div>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{handlePrice(price)}</p>
        <button onClick={showModal}>Đặt hàng</button>
      </div>
      <Modal
        className={styles.modal}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Hãy đăng nhập để có có trải nghiệm tốt nhất</p>
      </Modal>
    </>
  );
};

export default ProductItem;
