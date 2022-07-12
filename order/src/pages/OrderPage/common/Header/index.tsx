import cx from "classnames";
import React, { useEffect, useState } from "react";
import { FaMailBulk, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { logoutThunk } from "app/slices/authSlice";
import { filterActions } from "app/slices/filtersSlice";
import { fetchOrderByCustomId, selectOrderListByUserId } from "app/slices/orderSlice";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  var userId = JSON.parse(localStorage.getItem("userCurrent") || "{}").user.id;
  var userName = JSON.parse(localStorage.getItem("userCurrent") || "{}").user
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
  }, []);

  const logOut = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };
  return (
    <div className={styles.header}>
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
              <button>Đổi mật khẩu</button>
              <button onClick={logOut}>Đăng xuất</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
