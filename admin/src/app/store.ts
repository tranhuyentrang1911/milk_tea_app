import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import adminReducer from "./slices/adminSlice";
import categoryReducer from "./slices/categorySlice";
import filterReducer from "./slices/filtersSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import promotionReducer from "./slices/promotionSlice";
import userReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    promotion: promotionReducer,
    user: userReducer,
    product: productReducer,
    admin: adminReducer,
    category: categoryReducer,
    filter: filterReducer,
    order: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
