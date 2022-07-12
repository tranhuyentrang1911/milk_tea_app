import React, { useState } from "react";
import { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

import ProductApi from "api/productApi";
import { Product } from "models";
import { handlePrice, scrollToTop } from "utils";

import CartIcon from "../../common/CartIcon";
import OrderProduct from "../OrderProduct";
import styles from "./productDetail.module.scss";

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<Product>({
    name: "",
    categoryId: "",
    categoryName: "",
    img: "1.png",
    price: 0,
  });
  useEffect(() => {
    if (!productId) return;
    (async () => {
      const data: Product = await ProductApi.getById(productId);
      setProduct(data);
    })();
  }, [productId]);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleOrderProduct = (id: string) => {
    const orderForm: HTMLElement | null = document.querySelector(
      `#order-product-${id}`
    );
    if (orderForm) orderForm.style.display = "flex";
  };
  return (
    <>
      <CartIcon />
      <div style={{ marginTop: "76px" }}></div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.img}>
            <img
              src={require(`../../../../assets/images/products/${product.img}`)}
              alt="error"
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>{handlePrice(product.price)}</div>
          <button onClick={() => product.id && handleOrderProduct(product.id)}>
            <FaCartPlus />
            Đặt mua
          </button>
        </div>
        {product.id && (
          <OrderProduct
            key={product.id}
            id={product.id}
            img={product.img}
            categoryId={product.categoryId}
            name={product.name}
            price={product.price}
          />
        )}
      </div>
    </>
  );
};

export default ProductDetail;
