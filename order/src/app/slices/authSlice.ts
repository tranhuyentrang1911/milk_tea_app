import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AuthApi } from "api/authApi";
import { RootState } from "app/store";
import { Auth, User } from "models";

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};
export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (user: Auth): Promise<any> => {
    try {
      const data: User[] = await AuthApi.checkAuth(user);

      if (data.length > 0) {
        const dataRes = {
          token: "https://app-json-demo.herokuapp.com/api/login",
          user: data[0],
        };

        const fetchToken = async (url: string) => {
          try {
            const res = await fetch(url);
            const token = await res.json();
            localStorage.setItem("userCurrent", JSON.stringify(dataRes));
          } catch (error) {}
        };
        await fetchToken(dataRes.token);
        return dataRes;
      } else {
        localStorage.removeItem("userCurrent");
        return data;
      }
    } catch (error) {}
  }
);
export const logoutThunk = createAsyncThunk("auth/logoutThunk", async () => {
  await localStorage.removeItem("userCurrent");
});
const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.logging = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.logging = false;
        // state.currentUser = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.logging = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoggedIn = false;
        //state.currentUser = undefined;
      });
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
