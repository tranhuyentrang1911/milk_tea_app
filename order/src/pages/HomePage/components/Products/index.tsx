import React, { useEffect } from "react";

import Slider from "components/Slider";

import Filters from "../Filters";
import ProductList from "../ProductList";
import { scrollToTop } from "utils";

const Products = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <Slider />
      <div style={{ margin: "auto", width: "80%" }}>
        <Filters />
        <ProductList />
      </div>
    </>
  );
};

export default Products;
