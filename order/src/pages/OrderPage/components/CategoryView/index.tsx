import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCategory, selectCategoryList } from "app/slices/categorySlice";
import { Category } from "models";

import styles from "./category.module.scss";
import { useNavigate } from "react-router-dom";

const CategoryView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const categoryList: Category[] = useAppSelector(selectCategoryList);

  const handleCategoryChange = (id: string) => {
    // dispatch(filterActions.classifyFilterChange(id));
    navigate(`/order/category/${id}`);
  };
  return (
    <div>
      <div className={styles.category}>
        {categoryList.map((item) => (
          <div
            key={item.id}
            className={styles.category_item}
            onClick={() => {
              if (item.id) {
                handleCategoryChange(item.id);
              }
            }}
          >
            <div>
              <img
                src={require(`../../../../assets/images/productIcons/${item.img}`)}
                alt={item.name}
              />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
