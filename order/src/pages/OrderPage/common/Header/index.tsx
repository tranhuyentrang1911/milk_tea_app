import { Button, Input, Modal } from "antd";
import cx from "classnames";
import { Form, useFormik } from "formik";
import React, { forwardRef, useEffect, useState } from "react";
import { FaMailBulk, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import UserApi from "api/userApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { logoutThunk } from "app/slices/authSlice";
import { fetchOrderByCustomId, selectOrderListByUserId } from "app/slices/orderSlice";
import { changePassword } from "app/slices/usersSlice";
import { UpdateUser, User } from "models";
import { showSuccess } from "utils";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [userPass, setUserPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userId = JSON.parse(localStorage.getItem("userCurrent") || "{}").user
    .id;
  const userName = JSON.parse(localStorage.getItem("userCurrent") || "{}").user
    .name;

  const orderList = useAppSelector(selectOrderListByUserId);

  const handleSearch = () => {
    // dispatch(filterActions.nameFilterChange(nameFilter));
    navigate(`/order/search/${nameFilter}`);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      setNameFilter("");
    }
  };

  useEffect(() => {
    dispatch(fetchOrderByCustomId(userId));
  }, [userId]);
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const user: User = await UserApi.getById(userId);

      setUserPass(user.pass);
    })();
  }, [userId]);
  const logOut = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  interface ChangePass {
    oldPass: string;
    newPass: string;
    confirmNewPass: string;
  }
  const initialValues: ChangePass = {
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      oldPass: Yup.string()
        .required("Vui lòng nhập mật khẩu cũ")
        .test("checkOld", "Mật khẩu cũ không chính xác", (value) => {
          if (value === userPass) return true;
          else return false;
        }),
      newPass: Yup.string()
        .required("Vui lòng nhập mật khẩu mới")
        .test(
          "trim",
          "Mật khẩu không nên là một khoảng trắng",
          (value: any) => !/\s+/g.test(value)
        )
        .min(8, "Mật khẩu tối thiểu 8 ký tự!")
        .test(
          "checkNew",
          "Mật khẩu mới không được trùng với mật khẩu cũ",
          (value) => {
            if (value !== userPass) return true;
            else return false;
          }
        ),
      confirmNewPass: Yup.string()
        .required("Vui lòng nhập lại mật khẩu mới!")
        .oneOf([Yup.ref("newPass")], "Mật khẩu không trùng khớp!"),
    }),

    onSubmit: (values, { resetForm }) => {
      const updatePass = values.newPass;
      const updateUser: UpdateUser = { id: userId, pass: updatePass };
      dispatch(changePassword(updateUser));
      setIsModalVisible(false);
      showSuccess("Đổi mật khẩu thành công");
      resetForm();
    },
  });

  return (
    <div className={styles.header}>
      <Modal
        title="Đổi mật khẩu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={formik.handleSubmit}>
          <Input
            className={styles.input}
            type="password"
            placeholder="Mật khẩu cũ"
            name="oldPass"
            value={formik.values.oldPass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.oldPass && formik.touched.oldPass && (
            <small style={{ color: "red", paddingLeft: "10px" }}>
              {formik.errors.oldPass}
            </small>
          )}
          <div style={{ paddingTop: "20px" }}></div>
          <Input
            placeholder="Mật khẩu mới"
            name="newPass"
            value={formik.values.newPass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPass && formik.touched.newPass && (
            <small style={{ color: "red", paddingLeft: "10px" }}>
              {formik.errors.newPass}
            </small>
          )}
          <br />
          <div style={{ paddingTop: "20px" }}></div>
          <Input
            placeholder="Xác nhận mật khẩu mới"
            name="confirmNewPass"
            value={formik.values.confirmNewPass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmNewPass && formik.touched.confirmNewPass && (
            <small style={{ color: "red", paddingLeft: "10px" }}>
              {formik.errors.confirmNewPass}
            </small>
          )}
          <br />
          <div style={{ paddingTop: "20px" }}></div>
          <Button htmlType="submit">OK</Button>
        </form>
      </Modal>

      <div className={styles.left}>
        <div className={styles.logo}>
          <img
            src={require("../../../../assets/images/logo/logo_2.png")}
            alt=""
          />
        </div>
        <div className={styles.search}>
          <span onClick={handleSearch}>
            {" "}
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Bạn muốn mua gì..."
            value={nameFilter}
            onKeyDown={handleEnter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.email}>
          <FaMailBulk />
          {/* <div className={cx(styles.email_action, styles.active)}>
            <h3>Đơn hàng của bạn</h3>
            {orderList.map((item) => (
              <div key={item.id} className={styles.order_item}>
                <p>haha</p>
              </div>
            ))}
          </div> */}
        </div>
        <div className={styles.user}>
          <FaRegUserCircle />
          <div className={cx(styles.user_action, styles.active)}>
            <div className={styles.top}>
              <FaRegUserCircle />
              <p>{userName}</p>
            </div>
            <div className={styles.bottom}>
              <button onClick={showModal}>Đổi mật khẩu</button>
              <button onClick={logOut}>Đăng xuất</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
