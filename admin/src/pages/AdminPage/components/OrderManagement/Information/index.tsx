import { Table } from "antd";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchOrderList, selectOrderList } from "app/slices/orderSlice";
import { handlePrice } from "utils";

import styles from "../../../styles/admin.module.scss";

const OrderInformation = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectOrderList);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ID Khách hàng",
      key: "userId",
      dataIndex: "userId",
      // render: (value) => (

      // ),
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      // render: (value) => (

      // ),
    },
    {
      title: "Tổng giá",
      key: "price",
      dataIndex: "price",
      render: (value: any) => <>{handlePrice(value)}</>,
    },
    {
      title: "Ngày đặt",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Ghi chú",
      key: "note",
      dataIndex: "note",
    },
    {
      title: "Phương thức",
      key: "payment",
      dataIndex: "payment",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);

  const newData = data.map((item) => Object.assign({}, item, { key: item.id }));

  //   const handleMovePage = () => {
  //     navigate("/admin/add");
  //   };
  return (
    <>
      <div className={styles.table}>
        <Table columns={columns} dataSource={newData} />
      </div>
    </>
  );
};

export default OrderInformation;
