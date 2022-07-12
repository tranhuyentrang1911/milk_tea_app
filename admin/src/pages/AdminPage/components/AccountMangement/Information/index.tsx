import { Table } from "antd";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchUsersThunk, selectUserList } from "app/slices/usersSlice";

import styles from "../../../styles/admin.module.scss";

const UserInformation = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectUserList);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Khách hàng",
      key: "name",
      dataIndex: "name",
      // render: (value) => (

      // ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, []);

  const newData = data.map((item) => Object.assign({}, item, { key: item.id }));

  //   const handleMovePage = () => {
  //     navigate("/admin/add");
  //   };
  return (
    <>
      <div className={styles.main}>
        <Table columns={columns} dataSource={newData} />
      </div>
    </>
  );
};

export default UserInformation;
