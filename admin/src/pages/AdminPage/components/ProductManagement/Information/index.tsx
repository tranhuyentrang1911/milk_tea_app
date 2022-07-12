import { Button, Image, Space, Table } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  deleteProduct,
  fetchProductList,
  selectProductList,
} from "app/slices/productSlice";
import { Product } from "models";
import { handlePrice } from "utils";

import styles from "../../../styles/admin.module.scss";

const ProductInformation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProductList());
  }, []);
  const data: Product[] = useAppSelector(selectProductList);
  const newData = data.map((item) =>
    Object.assign({}, item, { key: item.id, action: item.id })
  );

  const handleMovePage = () => {
    navigate("/admin/product/add");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Ảnh",
      key: "img",
      dataIndex: "img",
      render: (img: string) => (
        <div style={{ width: "50px", height: "50px" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            src={require(`assets/images/products/${img}`)}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
      render: (price: number) => <div>{handlePrice(price)}</div>,
    },

    {
      title: "Tác vụ",
      key: "action",
      dataIndex: "action",
      render: (action: number | string) => (
        <Space size="middle">
          <Link to={`./update/${action}`}>Sửa</Link>
          <Button
            type="link"
            className={styles.button_link}
            onClick={() => {
              dispatch(deleteProduct(action));
            }}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button className={styles.add_button} onClick={handleMovePage}>
        Thêm sản phẩm
      </Button>
      <div className={styles.table}>
        <Table
          pagination={{
            defaultPageSize: 5,
            // showSizeChanger: true,
            // pageSizeOptions: ["10", "20", "30"],
          }}
          columns={columns}
          dataSource={newData}
        />
      </div>
    </>
  );
};

export default ProductInformation;
