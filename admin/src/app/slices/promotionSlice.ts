import { PaginationParams } from "./../../models/common";
import { Promotion } from "models";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface PromotionState {
  status: "idle" | "loading";
  list: Promotion[];
  pagination: PaginationParams;
}
const initialState: PromotionState = {
  status: "idle",
  list: [],
  pagination: {
    _page: 1,
    _limit: 8,
    _totalRows: 8,
  },
};
const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const fetchPromotions = createAsyncThunk(
  "promotion/fetchPromotions",
  async (obj: PaginationParams) => {
    try {
      const url = `http://localhost:3000/promotion?_page=${obj._page}&_limit=${obj._limit}`;
      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch (error) {}
  }
);
export const addPromotion = createAsyncThunk(
  "promotion/addPromotion",
  async (promotion) => {
    try {
      const res = await fetch("http://localhost:3000/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promotion),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
//Actions
export const promotionActions = promotionSlice.actions;
//Selectors
export const selectPromotionList = (state: RootState) => state.promotion.list;
//Reducer
const promotionReducer = promotionSlice.reducer;
export default promotionReducer;
