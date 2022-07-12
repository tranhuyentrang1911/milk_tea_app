import cx from "classnames";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

import { useAppDispatch } from "app/hooks";
import { updateProductToCart } from "app/slices/cartSlice";
import { Cart, EditCart } from "models";
import { handlePrice } from "utils";

import styles from "../../common/order.module.scss";

export interface UpdateCartItem {}
const UpdateOrderProduct = (props: Cart) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [totalPrice, setTotalPrice] = useState(props.price);
  const [size, setSize] = useState(props.size);
  const [sugar, setSugar] = useState(props.sugar);
  const [ice, setIce] = useState(props.ice);
  const [note, setNote] = useState(props.note);
  const dispatch = useAppDispatch();

  const handleCloseOnclick = () => {
    const updateForm: HTMLElement | null = document.querySelector(
      `#update-product-${props.id}`
    );
    if (updateForm) {
      updateForm.style.display = "none";
    }
  };
  const handleMinusQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleUpdateProductToCart = () => {
    if (props.id) {
      const updateProduct: EditCart = {
        id: props.id,
        size: size,
        sugar: sugar,
        ice: ice,
        note: note,
        quantity: quantity,
      };
      dispatch(updateProductToCart(updateProduct));
    }
  };
  useEffect(() => {
    setTotalPrice((pre) => (pre = props.price));
    if (size === "L") {
      setTotalPrice((pre) => pre + 5000);
    } else if (size === "XL") {
      setTotalPrice((pre) => pre + 10000);
    }

    setTotalPrice((pre) => pre * quantity);
  }, [size, quantity, props.price]);
  if (props.categoryId.toString() === "1") {
    return (
      <div
        className={styles.modal}
        id={`update-product-${props.id}`}
        onClick={handleCloseOnclick}
      >
        <div className={styles.main} onClick={(e) => e.stopPropagation()}>
          <div className={styles.close}>
            <button onClick={handleCloseOnclick}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.left}>
            <img
              alt="error"
              src={require(`../../../../assets/images/products/${props.img}`)}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.price}>{handlePrice(props.price)}</div>
            <div className={styles.quantity}>
              <button onClick={handleMinusQuantity}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={handleAddQuantity}>
                <FaPlus />
              </button>
            </div>
            <p>Chọn kích cỡ</p>
            <div className={styles.size}>
              <div
                className={cx(styles.size_item, {
                  [styles.active]: size === "M",
                })}
                onClick={() => {
                  setSize("M");
                }}
              >
                <p className={styles.size_main}>M</p>
                <p className={styles.size_price}>0 đ</p>
              </div>
              <div
                className={cx(styles.size_item, {
                  [styles.active]: size === "L",
                })}
                onClick={() => {
                  setSize("L");
                }}
              >
                <p className={styles.size_main}>L</p>
                <p className={styles.size_price}>+5000 đ</p>
              </div>
              <div
                className={cx(styles.size_item, {
                  [styles.active]: size === "XL",
                })}
                onClick={() => {
                  setSize("XL");
                }}
              >
                <p className={styles.size_main}>XL</p>
                <p className={styles.size_price}>+10000 đ</p>
              </div>
            </div>
            <p>Đường</p>
            <div className={styles.status}>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: sugar === "Ít",
                })}
                onClick={() => {
                  setSugar("Ít");
                }}
              >
                Ít{" "}
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: sugar === "Bình thường",
                })}
                onClick={() => {
                  setSugar("Bình thường");
                }}
              >
                Bình thường
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: sugar === "Nhiều",
                })}
                onClick={() => {
                  setSugar("Nhiều");
                }}
              >
                Nhiều
              </div>
            </div>
            <p>Đá</p>
            <div className={styles.status}>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: ice === "Ít",
                })}
                onClick={() => {
                  setIce("Ít");
                }}
              >
                Ít{" "}
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: ice === "Bình thường",
                })}
                onClick={() => {
                  setIce("Bình thường");
                }}
              >
                Bình thường
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: ice === "Nhiều",
                })}
                onClick={() => {
                  setIce("Nhiều");
                }}
              >
                Nhiều
              </div>
            </div>
            <p>Ghi chú</p>
            <textarea
              className={styles.note}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={styles.bottom}>
            <button
              onClick={() => {
                handleUpdateProductToCart();
                setTimeout(() => {
                  handleCloseOnclick();
                }, 500);
              }}
            >
              Cập nhật giỏ hàng: {handlePrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.modal}
        id={`update-product-${props.id}`}
        onClick={handleCloseOnclick}
      >
        <div
          className={cx(styles.main, styles.type2)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.close}>
            <button onClick={handleCloseOnclick}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.left}>
            <img
              alt="error"
              src={require(`../../../../assets/images/products/${props.img}`)}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.price}>{handlePrice(props.price)}</div>
            <div className={styles.quantity}>
              <button onClick={handleMinusQuantity}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={handleAddQuantity}>
                <FaPlus />
              </button>
            </div>

            <p>Ghi chú</p>
            <textarea
              className={cx(styles.note, styles.type2)}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={styles.bottom}>
            <button
              onClick={() => {
                handleUpdateProductToCart();
                setTimeout(() => {
                  handleCloseOnclick();
                }, 500);
              }}
            >
              Cập nhật giỏ hàng: {handlePrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateOrderProduct;
