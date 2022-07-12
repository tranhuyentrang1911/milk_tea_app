import { BackTop } from "antd";
import React, { useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";

import styles from "../../../assets/styles/backTop.module.scss";
import Footer from "../common/Footer";
import Header from "../common/Header";
import CartDetail from "../components/CartDetail";
import Checkout from "../components/Checkout";
import ProductDetail from "../components/ProductDetail";
import Products from "../components/Products";
import Search from "../components/Search";
import ProductListWithCategory from "../components/ProductListWithCategory";

const OrderLayout = () => {
  return (
    <>
      <Header />
      <BackTop>
        <div className={styles.back_top}>
          <FaAngleUp />
        </div>
      </BackTop>

      <Routes>
        <Route path="/*" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search/:nameFilter" element={<Search />} />
        <Route
          path="category/:categoryId"
          element={<ProductListWithCategory />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CartDetail />
      <Footer />
    </>
  );
};
export default OrderLayout;
