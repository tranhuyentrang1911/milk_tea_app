import { Input, Radio, RadioChangeEvent, Space } from "antd";
import cx from "classnames";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaClock, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { deleteProductToCart, fetchCartByUserId, selectCartList } from "app/slices/cartSlice";
import { addNewOrder } from "app/slices/orderSlice";
import { Order } from "models";
import { handlePrice, scrollToTop, showSuccess } from "utils";

import styles from "./checkout.module.scss";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const phone = JSON.parse(localStorage.getItem("userCurrent") || "{}").user
    .phone;
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipCost, setShipCost] = useState(0);
  const [totalOrderPrice, setOrderPrice] = useState(0);
  const [payment, setPayment] = useState("Trực tiếp");
  const [note, setNote] = useState("");
  const userId = JSON.parse(localStorage.getItem("userCurrent") || "{}").user
    .id;
  const cartDetail = useAppSelector(selectCartList);

  useEffect(() => {
    dispatch(fetchCartByUserId(userId));
  }, [userId]);
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    setTotalPrice(0);

    cartDetail.forEach((item) =>
      setTotalPrice((pre) => {
        if (item.size === "L") {
          return pre + (item.price + 5000) * item.quantity;
        } else if (item.size === "XL") {
          return pre + (item.price + 10000) * item.quantity;
        } else {
          return pre + item.price * item.quantity;
        }
      })
    );
  }, [cartDetail]);

  useEffect(() => {
    if (totalPrice >= 250000) {
      setShipCost(0);
    } else {
      setShipCost(35000);
    }
  }, [totalPrice]);

  useEffect(() => {
    setOrderPrice(totalPrice + shipCost);
  }, [totalPrice, shipCost]);
  const onPaymentChange = (e: RadioChangeEvent) => {
    setPayment(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Vui lòng nhập địa chỉ của bạn!"),
    }),
    onSubmit: (values) => {
      const date = new Date();
      const newOrder: Order = {
        date,
        userId,
        phone,
        price: totalOrderPrice,
        note,
        address: values.address,
        payment,
        status: "Đang giao hàng",
      };
      const cartIdArray: string[] = [];
      cartDetail.forEach((item) => {
        if (item.userId === userId) {
          if (item.id) {
            cartIdArray.push(item.id);
          }
        }
      });
      cartIdArray.forEach((item) => dispatch(deleteProductToCart(item)));
      dispatch(addNewOrder(newOrder));
      showSuccess("Đặt hàng");
      setNote("");
      navigate("/order");
    },
  });

  return (
    <form className={styles.main} onSubmit={formik.handleSubmit}>
      <div className={styles.left}>
        <div className={styles.left_item}>
          <div style={{ display: "flex" }}>
            <FaLocationArrow />

            <h3>Địa chỉ: </h3>
          </div>
          <Input
            className={
              formik.errors.address && formik.touched.address
                ? cx(styles.input, styles.active)
                : styles.input
            }
            name="address"
            placeholder="Nhập địa chỉ của bạn"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.address && formik.touched.address && (
            <small>{formik.errors.address}</small>
          )}
        </div>
        <div className={styles.left_item}>
          <div style={{ display: "flex" }}>
            {" "}
            <FaPhoneAlt />
            <h3>Số điện thoại</h3>
          </div>
          <p>{phone}</p>
        </div>
        <div className={styles.left_item}>
          <div style={{ display: "flex" }}>
            <FaClock />

            <h3>Thời gian nhận hàng</h3>
          </div>
          <div style={{ marginLeft: "30px" }}>
            <strong>Nhận hàng trong: </strong>
            <span>Hôm nay</span>
            <br />
            <strong>Thời gian giao hàng: </strong>
            <span>Càng sớm càng tốt</span>
          </div>
        </div>
        <div className={styles.left_item}>
          <h3>Ghi chú cho cửa hàng</h3>
          <Input
            className={styles.input}
            placeholder="Nhập ghi chú"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.right_item}>
          <h3>Thông tin thanh toán</h3>
          <div className={styles.price_item}>
            <p>Tạm tính: </p>
            <p>{handlePrice(totalPrice)}</p>
          </div>
          <div className={styles.price_item}>
            <p>Phí vận chuyển: </p>
            <p>{handlePrice(shipCost)}</p>
          </div>
          <div className={styles.price_item}>
            <p>Tổng tiền: </p>
            <p>{handlePrice(totalOrderPrice)}</p>
          </div>
        </div>
        <div className={styles.right_item}>
          <h3>Phương thức thanh toán</h3>
          <Radio.Group onChange={onPaymentChange} value={payment}>
            <Space direction="vertical">
              <Radio value="Trực tiếp">Thanh toán khi nhận hàng</Radio>
              <Radio value="Thẻ ngân hàng">Thẻ ngân hàng/Thẻ tín dụng</Radio>
              <Radio value="Ví điện tử">Ví ZaloPay/ Ví Momo</Radio>
            </Space>
          </Radio.Group>
        </div>
        <button type="submit">Đặt hàng</button>
      </div>
    </form>
  );
};

export default Checkout;
