import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import PromotionApi from "api/promotionApi";
import { RootState } from "app/store";
import { Promotion } from "models";

import { ListParams, ListResponse, PaginationParams } from "./../../models/common";

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
      .addCase(fetchPromotionWithPagination.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPromotionWithPagination.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const fetchPromotionWithPagination = createAsyncThunk(
  "promotion/fetchPromotionWithPagination",
  async (obj: ListParams): Promise<any> => {
    try {
      const data: ListResponse<Promotion> =
        await PromotionApi.getWithPagination(obj);
      console.log("dta", data);
      return data;
    } catch (error) {}
  }
);
export const addPromotion = createAsyncThunk(
  "promotion/addPromotion",
  async (promotion: Promotion): Promise<any> => {
    try {
      const data: Promotion = await PromotionApi.add(promotion);
      return data;
    } catch (error) {}
  }
);
//Actions
export const promotionActions = promotionSlice.actions;
//Selectors
export const selectPromotionList = (state: RootState) => state.promotion.list;
export const selectPromotionPagination = (state: RootState) =>
  state.promotion.pagination;
//Reducer
const promotionReducer = promotionSlice.reducer;
export default promotionReducer;
