import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CategoryApi from "api/categoryApi";
import { RootState } from "app/store";
import { Category } from "models";

export interface CategoryState {
  status: "idle" | "loading";
  list: Category[];
}
const initialState: CategoryState = {
  status: "idle",
  list: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {})
      .addCase(fetchCategoryItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryItem.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        let categoryItem = state.list.find(
          (item) => item.id === action.payload.id
        );
        categoryItem = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {})
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload
        );
        state.list.splice(index, 1);
      })
      .addCase(deleteCategory.rejected, (state, action) => {});
  },
});
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (): Promise<any> => {
    try {
      const data: Category[] = await CategoryApi.getAll();
      return data;
    } catch (error) {}
  }
);
export const fetchCategoryItem = createAsyncThunk(
  "category/fetchCategoryItem",
  async (id: any): Promise<any> => {
    try {
      const data: Category = await CategoryApi.getById(id);
      return data;
    } catch (error) {}
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category: Category): Promise<any> => {
    try {
      const data: Category = await CategoryApi.add(category);
      return data;
    } catch (error) {}
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category: Category): Promise<any> => {
    try {
      const data: Category = await CategoryApi.update(category);
      return data;
    } catch (error) {}
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number | string) => {
    try {
      await CategoryApi.remove(id);
      return id;
    } catch (error) {}
  }
);
//Selectors
export const selectCategoryList = (state: RootState) => state.category.list;

//Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
