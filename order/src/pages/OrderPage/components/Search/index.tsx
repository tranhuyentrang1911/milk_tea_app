import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductApi from "api/productApi";
import { Product } from "models";
import CartIcon from "pages/OrderPage/common/CartIcon";

import ProductList from "../ProductList";
import styles from "./search.module.scss";
import { scrollToTop } from "utils";

const Search = () => {
  const params = useParams();
  const name = params.nameFilter;
  const [productList, setProductList] = useState<Product[]>([]);
  useEffect(() => {
    if (!name) return;
    (async () => {
      const data: Product[] = await ProductApi.getByName(name);
      setProductList(data);
    })();
  }, [name]);
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <CartIcon />
      <div style={{ marginTop: "76px" }}></div>
      <div className={styles.container}>
        {productList.length > 0 && (
          <>
            <p>Có {productList.length} sản phẩm</p>
            <ProductList props={productList} />
          </>
        )}
        {productList.length === 0 && (
          <>
            <p className={styles.no_data}>Không có sản phẩm nào</p>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
