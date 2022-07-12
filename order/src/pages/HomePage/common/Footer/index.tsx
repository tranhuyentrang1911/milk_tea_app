import { useFormik } from "formik";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import * as Yup from "yup";

import styles from "./footer.module.scss";

const Footer = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập email trước ghi gửi biểu mẫu")
        .email("Vui lòng nhập đúng định dạng là email"),
    }),
    onSubmit: (values: any) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.information}>
          <div>
            <h3>Trụ sở chính: </h3>
            <span>
              Công ty Cổ Phần Phúc Long Heritage - ĐKKD: 0316 871719 do sở KHĐT
              TPHCM cấp lần đầu ngày 21/05/2021
            </span>
          </div>
          <div>
            <h3>Nhà máy: </h3>
            <span>
              D_8D_CN Đường XE 1, Khu Công Nghiệp Mỹ Phước III, phường Mỹ Phước,
              thị xã Bến Cát, tỉnh Bình Dương, Việt Nam
            </span>
          </div>
          <div>
            <h3>Địa chỉ: </h3>
            <span>
              42/24 - 42/26 Đường 643 Tạ Quang Bửu, phường 4, quận 8, Hồ Chí
              Minh
            </span>
          </div>
          <div>
            <h3>Điện thoại: </h3>
            <span>028 6263 0377 - 6263 0378</span>
          </div>
          <div>
            <h3>Fax: </h3>
            <span>ales@phuclong.com.vn</span>
            <br />
            <span style={{ paddingLeft: "35px" }}>Info@phuclong.com.vn</span>
          </div>
        </div>
        <form className={styles.email} onSubmit={formik.handleSubmit}>
          <h3>Đăng kí nhận tin khuyến mãi</h3>
          <input
            type="text"
            name="email"
            placeholder="Nhập địa chỉ email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={
              formik.errors.email && formik.touched.email
                ? styles.active
                : undefined
            }
          />
          <button type="submit">GỬI</button>
          <br />
          {formik.errors.email && formik.touched.email && (
            <small>{formik.errors.email}</small>
          )}
        </form>
        <div className={styles.contact}>
          <div>
            <img
              src={require("../../../../assets/images/logo/dathongbao.png")}
              alt=""
            />
          </div>
          <div className={styles.icons_contact}>
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>
      <div className={styles.copy_right}>
        © 2017 Bản quyền Phuc Long Co., Ltd
      </div>
    </>
  );
};

export default Footer;
