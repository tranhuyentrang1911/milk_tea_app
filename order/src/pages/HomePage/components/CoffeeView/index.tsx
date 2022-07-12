import React, { useEffect } from "react";

import { scrollToTop } from "utils";

import styles from "./coffeeView.module.scss";

const CoffeeView = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <div className={styles.banner}></div>

      <h1 className={styles.heading}>Hạt cà phê Phúc Long</h1>
      <div className={styles.logo}>
        <img src={require("assets/images/logo/icon_tealeaves.png")} alt="" />
      </div>
      <div className={styles.main}>
        <div className={styles.main_item}>
          <div className={styles.content}>
            Cà phê càng được rang sẫm màu hương vị càng trọn vẹn. Rang cà phê là
            một quá trình đòi hỏi sự tinh tế từ đôi bàn tay và sự am hiểu từng
            loại hạt cà phê của người nghệ nhân. Rang lửa nhỏ khiến cà phê chưa
            chín tới và đắng hơn, trong khi rang quá kỹ lại khiến cà phê cháy
            khét đánh mất những đặc tính thượng hạng vốn có. Trong quá trình
            rang đủ thời gian, những dinh dưỡng như proteins, enzymes mới sẽ
            tích tụ phía trong tạo nên phần chất của cà phê, làm cho cà phê đậm
            hơn, sánh hơn.
          </div>
        </div>
        <div className={styles.main_item}>
          <img
            src={require("assets/images/banner/cà phê Phúc Long đậm vị 3(1).jpg")}
            alt="error"
          />
        </div>
        <div className={styles.main_item}>
          <div className={styles.img2}>
            <img
              src={require("assets/images/banner/cà phê Phúc Long đậm vị 4.jpg")}
              alt="error"
            />
          </div>
        </div>
        <div className={styles.main_item}>
          <div className={styles.content}>
            Trên hành trình tìm kiếm những hạt cà phê ngon nhất, Phúc Long luôn
            chú trọng bốn đặc tính từ trái cà phê nhằm tôn trọng nguyên bản cho
            tách cà phê đậm vị. - Hương thơm là mùi hương của hạt cà phê - thơm
            bao nhiêu hứa hẹn cho nhiều vị bấy nhiêu. - Thể chất là khái niệm để
            chỉ độ đậm đà trong nước chiết xuất cà phê. cảm nhận thông qua đánh
            giá của người thưởng thức. - Acid là hợp chất tạo nên vị chua thanh
            của cà phê. - Hậu vị là cảm nhận vị cà phê còn đọng lại sau khi
            thưởng thức.
          </div>
        </div>
        <div className={styles.main_item}>
          <div className={styles.content}>
            Tách cà phê hoàn hảo được định nghĩa là tách cà phê có vị đắng đậm
            đà, chua thanh thoát, lan toả hương thơm nồng nàn, dễ dàng chinh
            phục vị giác của bất cứ ai. Tách cà phê đậm vị luôn luôn là thức
            uống giữ vị trí nhất định trong lòng những tín đồ cà phê Việt, dù
            văn hoá thưởng thức có nhiều thay đổi theo sự phát triển từng ngày
            của xã hội.
          </div>
        </div>
        <div className={styles.main_item}>
          <div className={styles.img2}>
            <img
              src={require("assets/images/banner/Dam vi ca phe 3''.jpg")}
              alt="error"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeeView;
