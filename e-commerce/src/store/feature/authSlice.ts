import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../util/axios";
import { Logins, User } from "../../../types";


export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: Logins, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", userData);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: data.accessToken,
          userName: data.userName,
          userId: data.userId,
        })
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to login"
      );
    }
  }
);


export const signUPUser = createAsyncThunk(
  "auth/sign-up",
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", userData);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: data.accessToken,
          userName: data.userName,
          userId: data.userId,
        })
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to sign up"
      );
    }
  }
);


const storedAuth = localStorage.getItem("auth");

const userData = storedAuth ? JSON.parse(storedAuth) : null;

const initialState = {
  userName: userData?.userName ?? null,
  token: userData?.token ?? null,
  userId: userData?.userId ?? null,
  loading: false,
  error: null as string | null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.userName = null;
      state.error = null;

      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.accessToken;
        state.userName = payload.userName;
        state.userId = payload.userId;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

      // Signup
      .addCase(signUPUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUPUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.accessToken;
        state.userName = payload.userName;
        state.userId = payload.userId;
        state.error = null;
      })
      .addCase(signUPUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});


export const authSelector = (state: any) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;