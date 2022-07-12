import React from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchProductList, selectProductList } from "app/slices/productSlice";
import Slider from "components/Slider";
import { Product } from "models";

import CartIcon from "../../common/CartIcon";
import Category from "../CategoryView";
import ProductList from "../ProductList";
import styles from "./products.module.scss";
import { scrollToTop } from "utils";

const Products = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const dispatch = useAppDispatch();
  const productList: Product[] = useAppSelector(selectProductList);

  useEffect(() => {
    dispatch(fetchProductList());
  }, []);
  return (
    <>
      <CartIcon />
      <div style={{ marginTop: "76px" }}></div>
      <Slider />
      <Category />
      <h1 className={styles.heading}>Tất cả sản phẩm</h1>
      <p className={styles.content}>
        Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà
        phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm
        giá trị nhất khi thưởng thức.
      </p>
      <ProductList props={productList} />
    </>
  );
};

export default Products;
