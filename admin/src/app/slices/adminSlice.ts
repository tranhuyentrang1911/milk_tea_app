import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AdminApi from "api/adminApi";
import { Admin, User } from "models";

import { showMessage } from "./../../utils/common";

export interface AdminState {
  status: "idle" | "loading";
  list: Admin[];
}
const initialState: AdminState = {
  status: "idle",
  list: [],
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(signInThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(signInThunk.rejected, (state, action) => {});
  },
});

//Thunk Actions
export const signInThunk = createAsyncThunk(
  "admin/signInThunk",
  async (user: User): Promise<any> => {
    try {
      const data: Admin[] = await AdminApi.checkAuth(user);

      if (data.length > 0) {
        const dataRes = {
          token: "https://app-json-demo.herokuapp.com/api/login",
          admin: data[0],
        };
        console.log(dataRes);
        const fetchToken = async (url: string) => {
          try {
            const res = await fetch(url);
            const token = await res.json();
            localStorage.setItem("admin", JSON.stringify(dataRes));
          } catch (error) {}
        };
        await fetchToken(dataRes.token);
        return dataRes;
      } else {
        showMessage("Tên đăng nhập hoặc mật khẩu không đúng");
        localStorage.removeItem("admin");
        return data;
      }
    } catch (error) {}
  }
);
//Selector

//Reducer
const adminReducer = adminSlice.reducer;
export default adminReducer;
