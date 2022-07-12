import React, { useEffect } from "react";

import { scrollToTop } from "utils";

import styles from "../CoffeeView/coffeeView.module.scss";

const TeaView = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <div className={styles.banner_tea}></div>

      <h1 className={styles.heading}>LÁ TRÀ PHÚC LONG</h1>
      <div className={styles.logo}>
        <img src={require("assets/images/logo/icon_tealeaves.png")} alt="" />
      </div>
      <div className={styles.main}>
        <div className={styles.main_item}>
          <div className={styles.content}>
            Một cây trà nếu được trồng ở những vùng đất có độ cao và khí hậu
            khác nhau thì sẽ thu được những loại trà cũng khác nhau. Có thể thấy
            sự phức tạp đến từ phía bên trong, từ những thành phần cũng như cấu
            tạo hoá học độc nhất vô nhị mà chỉ mình cây trà có được. Thấu hiểu
            điều đó, để giữ trọn vị tươi nguyên, bảo toàn dưỡng chất tốt nhất,
            một búp và hai lá non thường được chúng tôi thu hái vào thời điểm
            sáng sớm. Tiếp đến, quy trình sản xuất để cho ra các sản phẩm trà
            chất lượng cũng được thực hiện khép kín.
          </div>
        </div>
        <div className={styles.main_item}>
          <img
            src={require("assets/images/banner/trà phúc long 1.jpg")}
            alt="error"
          />
        </div>
        <div className={styles.main_item}>
          <div className={styles.img2}>
            <img
              src={require("assets/images/banner/trà phúc long 2.jpg")}
              alt="error"
            />
          </div>
        </div>
        <div className={styles.main_item}>
          <div className={styles.content}>
            Trong quá trình tìm kiếm từng loại trà thượng hạng, Phúc Long luôn
            giữ gìn những hợp chất đặc biệt từ lá trà để làm nên tách trà đậm
            vị. - Theanine (vị ngon) là cảm nhận được trạng thái tỉnh táo, tràn
            đầy năng lượng khi thưởng thức trà. - Carbohydrate (vị ngọt) là
            đường tích trữ trong lá trà. - Polyphenols (vị chát) là thành phần
            đặc biệt có nhiều trong lá trà non. - Caffein (vị đắng) là thành
            phần bị ảnh hưởng bởi 2 yếu tố: nhiệt độ nước và cách ngâm. Để tiết
            chế caffein, khi pha nên dùng nước nhiệt độ vừa phải và giảm thời
            gian ngâm trà. - Enzyme (men) là chất xúc tác sinh học thúc đẩy quá
            trình lên men của lá trà
          </div>
        </div>
        <div className={styles.main_item}>
          <div className={styles.content}>
            Phúc Long thấu hiểu để có được một tách trà ngon thì từ quá trình
            thu hái lá trà cho đến quá trình sao chế và pha trà cũng cần phải
            chuẩn xác. Khi sao trà cần phải canh lửa vừa vặn, khi pha trà nhiệt
            độ nước cũng vừa phải. Để giờ đây, cầm trên tay tách trà ngát hương,
            nhâm nhi trọn vị trà truyền thống như là một cách thể hiện tâm tình
            đối với cuộc sống, cảm thụ hương vị tự nhiên toát ra từ lá trà, lòng
            an nhiên trước bao bộn bề.
          </div>
        </div>
        <div className={styles.main_item}>
          <div className={styles.img2}>
            <img
              src={require("assets/images/banner/trà-phúc-long-6'.jpg")}
              alt="error"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeaView;
