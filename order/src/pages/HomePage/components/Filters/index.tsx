import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCategory, selectCategoryList } from "app/slices/categorySlice";
import { filterActions } from "app/slices/filtersSlice";
import { Category } from "models";
import React, { useEffect, useState } from "react";

import styles from "./filters.module.scss";

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filterName, setFilterName] = useState("");
  const categoryList: Category[] = useAppSelector(selectCategoryList);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const options = categoryList.map((item) =>
    Object.assign({}, { value: item.id, label: item.name })
  );

  const handleClassifyChange = (value: any) => {
    dispatch(filterActions.classifyFilterChange(value));
  };
  const handlePriceChange = (value: string) => {
    dispatch(filterActions.priceFilterChange(value));
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
    dispatch(filterActions.nameFilterChange(e.target.value));
  };
  return (
    <div className={styles.filters}>
      <div className={styles.filter_item}>
        <label htmlFor="phanloai">Chọn theo phân loại</label>
        <Select
          className={styles.select}
          //name="phanloai"
          id="phanloai"
          defaultValue={0}
          onChange={handleClassifyChange}
          options={[{ value: 0, label: "Không lựa chọn" }, ...options]}
        />
      </div>
      <div className={styles.filter_item}>
        <label htmlFor="gia">Chọn theo giá</label>
        <Select
          className={styles.select}
          // name="gia"
          id="gia"
          defaultValue="Không lựa chọn"
          onChange={handlePriceChange}
        >
          <Select.Option value="Không lựa chọn">Không lựa chọn</Select.Option>
          <Select.Option value="Từ thấp đến cao">Từ thấp đến cao</Select.Option>
          <Select.Option value="Từ cao đến thấp">Từ cao đến thấp</Select.Option>
        </Select>
      </div>
      <div className={styles.filter_item}>
        <label htmlFor="search">Chọn theo tên</label>
        <Input
          type="seacrh"
          name="search"
          id="search"
          placeholder="Nhập tên sản phẩm"
          value={filterName}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
};

export default Filters;
