import React from "react";
import { NavLink } from "react-router-dom";

// import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const Header = () => {
  const handleOpenForm = (formId: string) => {
    const form: HTMLElement | null = document.querySelector(formId);
    if (form) {
      form.style.display = "flex";
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.h_top}>
          <div className={styles.logo}>
            <img src={require("assets/images/logo/delivery.png")} alt="" />
          </div>
          <div className={styles.logo_2}>
            <img src={require("assets/images/logo/logo_1.png")} alt="" />
          </div>
          <div className={styles.auth}>
            <span onClick={() => handleOpenForm("#formSignIn")}>Đăng nhập</span>
            <span> / </span>
            <span onClick={() => handleOpenForm("#formSignUp")}>Đăng kí</span>
          </div>
        </div>
        <div className={styles.h_menu}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.header_link_active : styles.header_link
            }
            to="/"
          >
            Trang chủ
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? styles.header_link_active : styles.header_link
            }
            to="/products"
          >
            Sản phẩm
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.header_link_active : styles.header_link
            }
            to="/coffee-information"
          >
            Cà phê
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? styles.header_link_active : styles.header_link
            }
            to="/promotion"
          >
            Khuyến mãi
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.header_link_active : styles.header_link
            }
            to="/tea-information"
          >
            Trà
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.header_link_active : styles.header_link
            }
            to="/about-us"
          >
            Về chúng tôi
            <div className={styles.sub_nav}>
              <div className={styles.sub_nav_item}>
                <h3>Công ty</h3>
                <ul>
                  <li>Tầm nhìn</li>
                  <li>Sứ mệnh</li>
                  <li>Giá trị cốt lõi</li>
                  <li>Lĩnh vực hoạt động</li>
                </ul>
              </div>
              <div className={styles.sub_nav_item}>
                <h3>Tuyển dụng</h3>
                <ul>
                  <li>HTCH</li>
                  <li>Kiosk</li>
                  <li>Văn phòng</li>
                  <li>Nhà máy</li>
                </ul>
              </div>
              <div className={styles.sub_nav_item}>
                <h3>Thư viện</h3>
                <ul>
                  <li>Hình ảnh</li>
                  <li>Video</li>
                  <li>Hồ sơ công bố</li>
                  <li>Công văn</li>
                </ul>
              </div>
              <div className={styles.sub_nav_item}>
                <h3>Liên hệ</h3>
                <ul>
                  <li>Hệ thống cửa hàng Phúc Long COFFEE & TEA</li>
                  <li>Hệ thống cửa hàng Phúc Long Kiosk</li>
                </ul>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
