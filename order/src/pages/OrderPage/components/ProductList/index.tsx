import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Product } from "models";
import { handlePrice } from "utils";

import OrderProduct from "../OrderProduct";
import styles from "./productList.module.scss";

const ProductList: React.FC<{ props: Product[] }> = ({ props }) => {
  const productList = props;
  const navigate = useNavigate();

  const handleOrderProduct = (id: string) => {
    const orderForm: HTMLElement | null = document.querySelector(
      `#order-product-${id}`
    );
    if (orderForm) {
      orderForm.style.display = "flex";
    }
  };

  const handleToProductDetailPage = (id: string) => {
    navigate(`/order/products/${id}`, {
      state: {
        id,
      },
    });
  };
  return (
    <>
      <div className={styles.main}>
        {productList.map((item) => (
          <div key={item.id} className={styles.main_item}>
            <div
              className={styles.img}
              onClick={() => item.id && handleToProductDetailPage(item.id)}
            >
              <img
                src={require(`../../../../assets/images/products/${item.img}`)}
                alt={item.name}
              />
            </div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.price}>{handlePrice(item.price)}</p>
            <button onClick={() => item.id && handleOrderProduct(item.id)}>
              <FaCartPlus />
              Đặt mua
            </button>
          </div>
        ))}
        {productList.map((product: Product) => {
          if (product.id) {
            return (
              <OrderProduct
                key={product.id}
                id={product.id}
                img={product.img}
                categoryId={product.categoryId}
                name={product.name}
                price={product.price}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default ProductList;
