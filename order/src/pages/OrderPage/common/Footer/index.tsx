import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.left}>
          <h2>Địa chỉ</h2>
          <div>
            <span>Trụ sở chính: </span>
            <span>
              Công ty Cổ Phần Phúc Long Heritage - ĐKKD: 0316 871719 do sở KHĐT
              TPHCM cấp lần đầu ngày 21/05/2021
            </span>
          </div>
          <div>
            <span>Nhà máy: </span>
            <span>
              D_8D_CN Đường XE 1, Khu Công Nghiệp Mỹ Phước III, phường Mỹ Phước,
              thị xã Bến Cát, tỉnh Bình Dương, Việt Nam
            </span>
          </div>
          <div>
            <span>Địa chỉ: </span>
            <span>
              42/24 - 42/26 Đường 643 Tạ Quang Bửu, phường 4, quận 8, Hồ Chí
              Minh
            </span>
          </div>
          <div>
            <span>Điện thoại: </span>
            <span> 028 6263 0377 - 6263 0378</span>
          </div>
          <div>
            <span>Fax: </span>
            <span>(028) 6263 0379</span>
          </div>
          <div>
            <span>Email: </span>
            <span>Sales@phuclong.com.vn, Info@phuclong.com.vn</span>
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <h2>Công ty</h2>
            <p>Tầm nhìn</p>
            <p>Sứ mệnh</p>
            <p>Giá trị cốt lõi</p>
            <p>Lĩnh vực hoạt động</p>
          </div>
          <div>
            <h2>Tuyển dụng</h2>
            <p>HTCH</p>
            <p>Kiosk</p>
            <p>Văn phòng</p>
            <p>Nhà máy</p>
          </div>
          <div>
            <h2>Thư viện</h2>
            <p>Hình ảnh</p>
            <p>Video</p>
            <p>Hồ sơ công bố</p>
            <p>Công văn</p>
          </div>
          <div>
            <h2>Liên hệ</h2>
            <p>Hệ thống cửa hàng Phúc Long Coffee & Tea</p>
            <p>Hệ thống cửa hàng Phúc Long Kiosk</p>
          </div>
          <div>
            <h2>Khuyến mãi</h2>
            <p>Tin khuyến mãi</p>
          </div>
          <div>
            <h2>Thẻ</h2>
            <p>Điều khoản & Điều kiện thành viên</p>
            <p>FAQ</p>
          </div>
        </div>
      </div>
      <div className={styles.copy_right}>
        <h3>© Công ty CP Phúc Long Heritage 2022</h3>
        <div className={styles.icon_contact}>
          <FaInstagram />
          <FaFacebook />
          <FaYoutube />
        </div>
      </div>
    </div>
  );
};

export default Footer;
