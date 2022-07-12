import { RootState } from "app/store";
import { createSlice } from "@reduxjs/toolkit";
export interface FilterState {
  categoryId: number | string;
  price: "Không lựa chọn" | "Từ cao đến thấp" | "Từ thấp đến cao";
  name: string;
}
const initialState: FilterState = {
  categoryId: 0,
  price: "Không lựa chọn",
  name: "",
};
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    classifyFilterChange: (state, action) => {
      state.categoryId = action.payload;
    },
    priceFilterChange: (state, action) => {
      state.price = action.payload;
    },
    nameFilterChange: (state, action) => {
      state.name = action.payload;
    },
  },
});
//Actions
export const filterActions = filterSlice.actions;
//Selectors
export const selectCategoryIdFilter = (state: RootState) =>
  state.filter.categoryId;
export const selectPriceFilter = (state: RootState) => state.filter.price;
export const selectNameFilter = (state: RootState) => state.filter.name;
//Reducer
const filterReducer = filterSlice.reducer;
export default filterReducer;
