import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../util/axios";
import { Error, Logins, User } from "../../types";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: Logins, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", userData);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: data.token,
          userName: data.userName,
          userId: data.userId,
        })
      );
      return data;
    } catch (error: Error | any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Failed to login"
      );
    }
  }
);

export const signUPUser = createAsyncThunk(
  "auth/sign-up",
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/sign-up", userData);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: data.token,
          userName: data.userName,
          userId: data.userId,
        })
      );
      return data;
    } catch (error: Error | any) {
      console.log(`Server Error: ${error.data?.message || error?.message}`);
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to login"
      );
    }
  }
);

const userData = JSON.parse(localStorage.getItem("auth") as string);

const initialState = {
  userName: userData?.userName || null,
  token: userData?.token || null,
  userId: userData?.userId || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.userName = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.userName = payload.userName;
        state.userId = payload.userId;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, {payload}: any) => {
        state.loading = false;
        state.error = payload
      })
      .addCase(signUPUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUPUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      })
      .addCase(signUPUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const authSelector = (state: any) => state.auth;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
