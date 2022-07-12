import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import ProductApi from "api/productApi";
import { RootState } from "app/store";
import { Product } from "models";

import { selectCategoryIdFilter, selectNameFilter, selectPriceFilter } from "./filtersSlice";

export interface ProductState {
  status: "idle" | "loading";
  list: Product[];
}
const initialState: ProductState = {
  status: "idle",
  list: [],
};
const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(fetchProductItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductItem.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(addProduct.rejected, (state, action) => {})
      .addCase(updateProduct.fulfilled, (state, action) => {
        let currentProduct = state.list.find(
          (item) => item.id === action.payload.id
        );
        currentProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {})
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload
        );
        state.list.splice(index, 1);
      })
      .addCase(deleteProduct.rejected, (state, action) => {});
  },
});

export const fetchProductList = createAsyncThunk(
  "productList/fetchProductList",
  async (): Promise<any> => {
    try {
      const data: Product[] = await ProductApi.getAll();
      return data;
    } catch (error) {}
  }
);
export const fetchProductItem = createAsyncThunk(
  "productList/fetchProductItem",
  async (id: any): Promise<any> => {
    try {
      const data: Product = await ProductApi.getById(id);
      return data;
    } catch (error) {}
  }
);
export const addProduct = createAsyncThunk(
  "productList/addProduct",
  async (product: Product): Promise<any> => {
    try {
      const data: Product = await ProductApi.add(product);
      return data;
    } catch (error) {}
  }
);
export const updateProduct = createAsyncThunk(
  "productList/updateProduct",
  async (product: Product): Promise<any> => {
    try {
      const data: Product = await ProductApi.update(product);
      return data;
    } catch (e) {}
  }
);
export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async (id: number | string): Promise<any> => {
    try {
      await ProductApi.remove(id);
      return id;
    } catch (error) {}
  }
);

//Selectors
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductListRemaining = createSelector(
  selectProductList,
  selectCategoryIdFilter,
  selectPriceFilter,
  selectNameFilter,

  (productList, categoryId, price, name) => {
    if (price === "Từ thấp đến cao") {
      productList = productList.slice().sort((a, b) => a.price - b.price);
    }
    if (price === "Từ cao đến thấp") {
      productList = productList.slice().sort((a, b) => b.price - a.price);
    }
    return productList.filter((product) => {
      if (categoryId === 0) return product.name.includes(name);
      else
        return product.name.includes(name) && product.categoryId === categoryId;
    });
  }
);

//Reducer
const productReducer = productSlice.reducer;
export default productReducer;
