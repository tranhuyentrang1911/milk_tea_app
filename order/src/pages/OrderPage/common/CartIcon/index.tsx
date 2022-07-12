import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCartByUserId, selectCartList } from "app/slices/cartSlice";
import { Cart } from "models";

const CartElement = styled.div`
  width: 50px;
  height: 50px;
  background-color: #0c713d;
  position: fixed;
  right: 40px;
  bottom: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border: 1px solid #fff;
`;
const Index = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  border: 1px solid #aaa;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: red;
  right: -4%;
  top: -4%;
  border-radius: 50%;
`;

const CartIcon: React.FC = () => {
  const dispatch = useAppDispatch();

  const cartDetail: Cart[] = useAppSelector(selectCartList);

  const userId = JSON.parse(localStorage.getItem("userCurrent") || "{}").id;

  useEffect(() => {
    dispatch(fetchCartByUserId(userId));
  }, [userId]);

  const handleOnclick = () => {
    const cartDetail: HTMLElement | null =
      document.querySelector(`#cartDetail`);
    if (cartDetail) {
      cartDetail.style.display = "flex";
    }
  };
  return (
    <div>
      <CartElement onClick={handleOnclick}>
        {cartDetail.length > 0 && (
          <Index style={{ textAlign: "center" }}> {cartDetail.length}</Index>
        )}
        <div
          style={{
            width: "60%",
            height: "60%",
            fill: "#fff",
          }}
        >
          <FaCartPlus
            style={{
              color: "white",
              fontSize: "25px",
            }}
          />
        </div>
      </CartElement>
    </div>
  );
};

export default CartIcon;
