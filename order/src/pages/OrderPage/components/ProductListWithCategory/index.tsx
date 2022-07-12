import ProductApi from "api/productApi";
import { Product } from "models";
import CartIcon from "pages/OrderPage/common/CartIcon";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { scrollToTop } from "utils";
import CategoryView from "../CategoryView";
import ProductList from "../ProductList";
import styles from "../Search/search.module.scss";
const ProductListWithCategory = () => {
  const params = useParams();
  const categoryId = params.categoryId;
  const [productList, setProductList] = useState<Product[]>([]);
  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      const data: Product[] = await ProductApi.getByCategoryId(categoryId);
      setProductList(data);
    })();
  }, [categoryId]);
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <CartIcon />
      <div style={{ marginTop: "86px" }}></div>

      <CategoryView />
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

export default ProductListWithCategory;
