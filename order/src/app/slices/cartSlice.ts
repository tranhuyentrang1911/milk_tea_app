import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartApi from "api/cartApi";

import { RootState } from "app/store";
import { Cart } from "models";

import { EditCart } from "./../../models/cart";

export interface CartState {
  status: "idle" | "loading";
  list: Cart[];
}
const initialState: CartState = {
  status: "idle",
  list: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProductToCart.fulfilled, (state, action) => {
        let currentProduct = state.list.find(
          (item) => item.id === action.payload.id
        );

        if (currentProduct) {
          currentProduct.size = action.payload.size;
          currentProduct.sugar = action.payload.sugar;
          currentProduct.ice = action.payload.ice;
          currentProduct.note = action.payload.note;
          currentProduct.quantity = action.payload.quantity;
        }
      })
      // .addCase(updateQuantity.fulfilled, (state, action) => {
      //   let currentProduct = state.list.find(
      //     (item) => item.id === action.payload.id
      //   );
      //   if (currentProduct) {
      //     currentProduct.quantity = action.payload.quantity;
      //   }
      // })
      .addCase(deleteProductToCart.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload
        );
        state.list.splice(index, 1);
      });
  },
});
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (id: string): Promise<any> => {
    try {
      const data: Cart[] = await CartApi.getAll(id);
      return data;
    } catch (error) {}
  }
);
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (product: Cart): Promise<any> => {
    try {
      const data: Cart = await CartApi.add(product);
      return data;
    } catch (e) {}
  }
);
// export const updateQuantity = createAsyncThunk(
//   "cart/updateQuantity",
//   async (product: EditCart): Promise<any> => {
//     try {
//       const data: EditCart = await CartApi.update(product);
//       return data;
//     } catch (e) {}
//   }
// );
export const updateProductToCart = createAsyncThunk(
  "cart/updateProductToCart",
  async (product: EditCart): Promise<any> => {
    try {
      const data: EditCart = await CartApi.update(product);
      return data;
    } catch (e) {}
  }
);
export const deleteProductToCart = createAsyncThunk(
  "cart/deleteProductToCart",
  async (id: string): Promise<any> => {
    try {
      await CartApi.remove(id);
      return id;
    } catch (error) {}
  }
);
//Selector
export const selectCartList = (state: RootState) => state.cart.list;
export const selectCartStatus = (state: RootState) => state.cart.status;
//Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
