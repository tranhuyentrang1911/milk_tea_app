import { BackTop } from "antd";
import React, { useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";

import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import CallNow from "components/CallNow";
import Loading from "components/Loading";
import NotFound from "components/NotFound";

import styles from "../../../assets/styles/backTop.module.scss";
import Footer from "../common/Footer";
import Header from "../common/Header";
import AboutUs from "../components/AboutUs";
import CoffeeView from "../components/CoffeeView";
import Home from "../components/Home";
import Products from "../components/Products";
import PromotionView from "../components/PromotionView";
import SignIn from "../components/SignIn_SignUp/SignIn";
import SignUp from "../components/SignIn_SignUp/SignUp";
import TeaView from "../components/TeaView";

const HomeLayout = () => {
  const loading = useAppSelector((state: RootState) => state.auth.logging);

  useEffect(() => {
    const loadingModal: HTMLElement | null = document.getElementById("loading");
    if (loadingModal) {
      if (loading) {
        loadingModal.style.display = "flex";
      } else {
        loadingModal.style.display = "none";
      }
    }
  }, [loading]);
  return (
    <>
      <CallNow />
      <Loading />
      <SignUp />
      <SignIn />
      <BackTop>
        <div className={styles.back_top}>
          <FaAngleUp />
        </div>
      </BackTop>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/promotion" element={<PromotionView />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/coffee-information" element={<CoffeeView />} />
        <Route path="/tea-information" element={<TeaView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default HomeLayout;
