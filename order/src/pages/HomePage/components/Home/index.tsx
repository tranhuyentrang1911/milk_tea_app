import React, { useEffect } from "react";

import Slider from "components/Slider";

import styles from "./home.module.scss";
import { scrollToTop } from "utils";

const Home = () => {
  // const store = useSelector((store) => store);
  // console.log(store);
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <Slider />
      <h1 className={styles.heading}>Giới thiệu Phúc Long</h1>
      <div className={styles.logo}>
        <img src={require("assets/images/logo/icon_tealeaves.png")} alt="" />
      </div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.main_item}>
            <img
              src={require("assets/images/banner/bannertrangchu1.jpg")}
              alt="error"
            />
          </div>
          <div className={styles.main_item}>
            <h2 className={styles.title}>
              TỪ NHỮNG MẦM TRÀ, CHÚNG TÔI TẠO RA NIỀM ĐAM MÊ
            </h2>
            <div className={styles.content}>
              <p>
                Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và
                hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng
                những trải nghiệm giá trị nhất khi thưởng thức, Phúc Long liên
                tục là thương hiệu tiên phong với nhiều ý tưởng sáng tạo đi đầu
                trong ngành trà và cà phê.{" "}
              </p>
              <p>
                Chúng tôi tin rằng từng sản phẩm trà và cà phê sẽ càng thêm hảo
                hạng khi được tạo ra từ sự phấn đấu không ngừng cùng niềm đam
                mê. Và chính kết nối dựa trên niềm tin, sự trung thực và tin yêu
                sẽ góp phần mang đến những nét đẹp trong văn hóa thưởng trà và
                cà phê ngày càng bay cao, vươn xa.
              </p>
            </div>
            <button>Xem thêm</button>
          </div>
          <div className={styles.main_item}>
            <h2 className={styles.title}>
              ĐỘI NGŨ NHÂN VIÊN TRÀN ĐẦY NHIỆT HUYẾT
            </h2>
            <div className={styles.content}>
              <p>
                Trong suốt quá trình hoạt động và phát triển, đội ngũ quản lý và
                nhân viên của Phúc Long Coffee & Tea, qua bao thế hệ, đã cùng
                nhau xây dựng, nuôi dưỡng niềm đam mê dành cho trà và cà phê với
                mong muốn được thử thách bản thân trong ngành dịch vụ năng động
                và sáng tạo.
              </p>
            </div>
            <button>Gia nhập đội ngũ Phúc Long</button>
          </div>
          <div className={styles.main_item}>
            <div className={styles.img2}>
              <img
                src={require("assets/images/banner/tuyendung1.jpg")}
                alt="error"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
