import React, { useEffect, useState } from "react";
import { FaMinus, FaPencilAlt, FaPlus, FaRegFrownOpen, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { deleteProductToCart, fetchCartByUserId, selectCartList, updateProductToCart } from "app/slices/cartSlice";
import { Cart } from "models";
import { handlePrice, showMessage } from "utils";

import UpdateOrderProduct from "../UpdateProduct";
import styles from "./cartDetail.module.scss";

const CartDetail = () => {
  const cartDetail: Cart[] = useAppSelector(selectCartList);
  const dispatch = useAppDispatch();
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const userId = JSON.parse(localStorage.getItem("userCurrent") || "{}").user
    .id;
  useEffect(() => {
    dispatch(fetchCartByUserId(userId));
  }, [userId]);

  const handleMinusQuantity = (quantity: number, id: string) => {
    if (quantity > 1) quantity = quantity - 1;
    dispatch(updateProductToCart({ id: id, quantity: quantity }));
  };
  const handleAddQuantity = (quantity: number, id: string) => {
    quantity = quantity + 1;
    dispatch(updateProductToCart({ id: id, quantity: quantity }));
  };
  const handleCloseOnclick = () => {
    const cartDetail: HTMLElement | null =
      document.querySelector(`#cartDetail`);
    if (cartDetail) {
      cartDetail.style.display = "none";
    }
  };
  const handleUpdateOrderProduct = (id: string) => {
    const updateForm: HTMLElement | null = document.querySelector(
      `#update-product-${id}`
    );
    if (updateForm) {
      updateForm.style.display = "flex";
    }
  };

  useEffect(() => {
    setTotalCartPrice(0);
    setNumber(cartDetail.length);
    cartDetail.forEach((item) =>
      setTotalCartPrice((pre) => {
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
  //const
  const navigate = useNavigate();
  const handleMovePage = () => {
    if (totalCartPrice > 0) {
      handleCloseOnclick();
      navigate(`/order/checkout`);
    } else {
      showMessage("Bạn chưa chọn sản phẩm nào");
    }
  };
  return (
    <>
      <div
        className={styles.modal}
        id="cartDetail"
        onClick={handleCloseOnclick}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.close}>
            <button onClick={handleCloseOnclick}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.heading}>Giỏ hàng của bạn ({number} món)</div>
          <div className={styles.main}>
            {number <= 0 && (
              <>
                <div className={styles.sad_icon}>
                  <FaRegFrownOpen />
                </div>
                <h2
                  style={{
                    textAlign: "center",
                    color: "green",
                    marginTop: "30px",
                  }}
                >
                  Không có sản phẩm nào
                </h2>
              </>
            )}
            {cartDetail.map((item) => (
              <div className={styles.main_item} key={item.id}>
                <div className={styles.left}>
                  <div className={styles.img}>
                    <img
                      src={require(`assets/images/products/${item.img}`)}
                      alt="Error"
                    />
                  </div>
                  <div className={styles.information}>
                    <div className={styles.name}>{item.name}</div>
                    {item.categoryId.toString() === "1" && (
                      <div className={styles.detail}>
                        <span>Kích cỡ: {item.size}, </span>
                        <span>Đường: {item.sugar}, </span>
                        <span>Đá: {item.ice} </span>
                      </div>
                    )}
                    {item.note && (
                      <div>
                        Ghi chú:{" "}
                        {item.note.length >= 20
                          ? item.note.slice(0, 20).concat("...")
                          : item.note}
                      </div>
                    )}
                    <div className={styles.price}>
                      {handlePrice(item.price)}
                    </div>
                  </div>
                </div>
                <div className={styles.action}>
                  <div>
                    <div
                      className={styles.update}
                      onClick={() => {
                        if (item.id) {
                          handleUpdateOrderProduct(item.id);
                        }
                      }}
                    >
                      <FaPencilAlt />
                    </div>
                    <div
                      className={styles.delete}
                      onClick={() => {
                        // dispatch(cartSlice.actions.deleteProductToCart(item.id))
                        if (item.id) {
                          dispatch(deleteProductToCart(item.id));
                        }
                      }}
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => {
                        if (item.id) {
                          handleMinusQuantity(item.quantity, item.id);
                        }
                      }}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.id) {
                          handleAddQuantity(item.quantity, item.id);
                        }
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.clear}></div>

          <div className={styles.bottom}>
            <button onClick={handleMovePage}>
              Thanh toán: {handlePrice(totalCartPrice)}
            </button>
          </div>
        </div>
      </div>
      {cartDetail.map((item) => {
        return (
          <UpdateOrderProduct
            key={item.id}
            id={item.id}
            name={item.name}
            categoryId={item.categoryId}
            userId={item.userId}
            size={item.size}
            sugar={item.sugar}
            ice={item.ice}
            img={item.img}
            note={item.note}
            quantity={item.quantity}
            price={item.price}
          />
        );
      })}
      ;
    </>
  );
};

export default CartDetail;
