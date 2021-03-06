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
        .required("Vui l??ng nh???p m???t kh???u c??")
        .test("checkOld", "M???t kh???u c?? kh??ng ch??nh x??c", (value) => {
          if (value === userPass) return true;
          else return false;
        }),
      newPass: Yup.string()
        .required("Vui l??ng nh???p m???t kh???u m???i")
        .test(
          "trim",
          "M???t kh???u kh??ng n??n l?? m???t kho???ng tr???ng",
          (value: any) => !/\s+/g.test(value)
        )
        .min(8, "M???t kh???u t???i thi???u 8 k?? t???!")
        .test(
          "checkNew",
          "M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??",
          (value) => {
            if (value !== userPass) return true;
            else return false;
          }
        ),
      confirmNewPass: Yup.string()
        .required("Vui l??ng nh???p l???i m???t kh???u m???i!")
        .oneOf([Yup.ref("newPass")], "M???t kh???u kh??ng tr??ng kh???p!"),
    }),

    onSubmit: (values, { resetForm }) => {
      const updatePass = values.newPass;
      const updateUser: UpdateUser = { id: userId, pass: updatePass };
      dispatch(changePassword(updateUser));
      setIsModalVisible(false);
      showSuccess("?????i m???t kh???u th??nh c??ng");
      resetForm();
    },
  });

  return (
    <div className={styles.header}>
      <Modal
        title="?????i m???t kh???u"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={formik.handleSubmit}>
          <Input
            className={styles.input}
            type="password"
            placeholder="M???t kh???u c??"
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
            placeholder="M???t kh???u m???i"
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
            placeholder="X??c nh???n m???t kh???u m???i"
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
            placeholder="B???n mu???n mua g??..."
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
            <h3>????n h??ng c???a b???n</h3>
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
              <button onClick={showModal}>?????i m???t kh???u</button>
              <button onClick={logOut}>????ng xu???t</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
