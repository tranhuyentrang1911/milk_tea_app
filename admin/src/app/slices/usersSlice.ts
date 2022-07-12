import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UserApi from "api/userApi";
import { RootState } from "app/store";
import { User } from "models";

export interface UserState {
  status: "idle" | "loading";
  list: User[];
}
const initialState: UserState = {
  status: "idle",
  list: [],
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(addUserThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = "idle";
      })
      .addCase(addUserThunk.rejected, (state, action) => {});
  },
});
export const fetchUsersThunk = createAsyncThunk(
  "user/fetchUsersThunk",
  async (): Promise<any> => {
    try {
      const data: User[] = await UserApi.getAll();
      return data;
    } catch (error) {}
  }
);
export const addUserThunk = createAsyncThunk(
  "users/addUserThunk",

  async (user: User): Promise<any> => {
    try {
      const data: User = await UserApi.add(user);
      return data;
    } catch (error) {}
  }
);
//Actions

//Selectors
export const selectUserList = (state: RootState) => state.user.list;
//Reducer
const userReducer = userSlice.reducer;
export default userReducer;
