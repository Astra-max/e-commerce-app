import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken, setAccessToken } from "../../services/token";
import API from "../../services/axios";
import { Logins, User } from "../../../types";


export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: Logins, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", userData);
      setAccessToken(data.accessToken);
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
      setAccessToken(data.accessToken);
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

export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  try {
    await API.post("/auth/logout"); // clears the refresh cookie server-side
  } finally {
    setAccessToken(null);
    dispatch(logout());
  }
});


interface UserCredentials {
  userName: string | null;
  token: string | null;
  userId: string | null
}

interface UserType {
  user: UserCredentials | null 
}

const user: UserCredentials = {userName: null, token: null, userId: null}

interface AuthState extends UserType {
  loading: boolean;
  error: null | string;
  isAuthenticated: boolean;
}


const initialState: AuthState = {
  user: user,
  loading: false,
  error: null,
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, { payload }: any) => {
      state.user = {
        userId: payload?.data?.userId ?? payload?.userId ?? null,
        userName: payload?.data?.userName ?? payload?.userName ?? null,
        token: payload?.accessToken ?? payload?.data?.accessToken ?? getAccessToken() ?? null,
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = { userName: null, token: null, userId: null };
      state.error = null;
      state.isAuthenticated = false;
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
        state.user = payload;
        state.isAuthenticated = true;
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
        state.user = {
          userId: payload.userId ?? null,
          userName: payload.userName ?? null,
          token: payload.accessToken ?? null,
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUPUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});


export const authSelector = (state: any) => state.auth;

export const { logout, setSession } = authSlice.actions;

export default authSlice.reducer;