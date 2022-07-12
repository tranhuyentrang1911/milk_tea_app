import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  fetchPromotionWithPagination,
  selectPromotionList,
  selectPromotionPagination,
} from "app/slices/promotionSlice";
import { ListParams, Promotion } from "models";
import { scrollToTop } from "utils";

import styles from "./promotion.module.scss";

const PromotionView: React.FC = () => {
  const dispatch = useAppDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  const { _page, _limit, _totalRows }: ListParams = useAppSelector(
    selectPromotionPagination
  );
  const totalPages = Math.ceil(_totalRows / _limit);
  const totalPagesArray = [];
  const promotionList: Promotion[] = useAppSelector(selectPromotionList);

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }
  const handleSetPageCurrent = (newPage: number) => {
    if (newPage) {
      setPageCurrent(newPage);
    }
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    const obj: ListParams = {
      _page: pageCurrent,
      _limit: 8,
    };

    dispatch(fetchPromotionWithPagination(obj));
  }, [pageCurrent]);

  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <div className={styles.banner}></div>

      <div className={styles.container}>
        <div className={styles.main}>
          {promotionList.map((item) => (
            <div key={item.id} className={styles.main_item}>
              <div className={styles.img}>
                <img
                  src={require(`assets/images/post/${item.img}`)}
                  alt="Error img"
                />
                <div className={styles.day}>
                  {item.start} - {item.end}
                </div>
                <div className={styles.title}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <div className={styles.button}>
            <button
              disabled={_page <= 1}
              onClick={() => handleSetPageCurrent(_page - 1)}
            >
              <FaAngleLeft />
            </button>
          </div>
          {totalPagesArray.map((item, index) => (
            <div className={styles.button} key={item}>
              <button
                className={_page === item ? styles.active : undefined}
                onClick={() => handleSetPageCurrent(item)}
              >
                {item}
              </button>
            </div>
          ))}
          <div className={styles.button}>
            <button
              disabled={_page >= totalPages}
              onClick={() => handleSetPageCurrent(_page + 1)}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionView;
