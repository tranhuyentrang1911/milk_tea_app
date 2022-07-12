import { Button, Image, Space, Table } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  deleteCategory,
  fetchCategory,
  selectCategoryList,
} from "app/slices/categorySlice";
import { Category } from "models";

import styles from "../../../styles/admin.module.scss";

const CategoryInformation: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data: Category[] = useAppSelector(selectCategoryList);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      key: "img",
      dataIndex: "img",
      render: (img: string) => (
        <div style={{ width: "50px", height: "50px" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            src={require(`assets/images/productIcons/${img}`)}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Tác vụ",
      key: "action",
      dataIndex: "action",
      render: (action: number | string) => (
        <Space size="middle">
          <Link to={`/admin/category/update/${action}`}>Sửa</Link>
          <Button
            type="link"
            className={styles.button_link}
            onClick={() => {
              dispatch(deleteCategory(action));
            }}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const newData = data.map((item) =>
    Object.assign({}, item, { key: item.id, action: item.id })
  );

  const handleMovePage = () => {
    navigate("/admin/category/add");
  };
  return (
    <>
      <Button className={styles.add_button} onClick={handleMovePage}>
        Thêm danh mục
      </Button>
      <div className={styles.table}>
        <Table columns={columns} dataSource={newData} />
      </div>
    </>
  );
};

export default CategoryInformation;
