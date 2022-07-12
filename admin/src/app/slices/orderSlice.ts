import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import OrderApi from "api/orderApi";
import { RootState } from "app/store";
import { Order } from "models";

export interface OrderState {
  status: "idle" | "loading";
  list: Order[];
}
const initialState: OrderState = {
  status: "idle",
  list: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchOrderByCustomId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByCustomId.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});
export const fetchOrderList = createAsyncThunk(
  "order/fetchOrderList",
  async (): Promise<any> => {
    try {
      const data: Order[] = await OrderApi.getAll();
      return data;
    } catch (error) {}
  }
);
export const fetchOrderByCustomId = createAsyncThunk(
  "order/fetchOrderItem",
  async (customId: number | string): Promise<any> => {
    try {
      const data: Order[] = await OrderApi.getByCustomId(customId);

      return data;
    } catch (error) {}
  }
);
export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async (newOrder: Order): Promise<any> => {
    try {
      const data: Order = await OrderApi.add(newOrder);
      return data;
    } catch (e) {}
  }
);
export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  async (order: Partial<Order>): Promise<any> => {
    try {
      const data: Order = await OrderApi.update(order);
      return data;
    } catch (e) {}
  }
);
//Selectors
export const selectOrderList = (state: RootState) => state.order.list;
//Reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;
