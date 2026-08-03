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

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth/profile");
      const raw = data.data ?? data;
      // normalize snake_case from backend to camelCase used in frontend
      const normalized = {
        userId: raw.userId ?? raw.user_id ?? null,
        userName: raw.userName ?? raw.user_name ?? null,
        firstName: raw.firstName ?? raw.first_name ?? null,
        secondName: raw.secondName ?? raw.second_name ?? null,
        emailAddr: raw.emailAddr ?? raw.email_addr ?? raw.email ?? null,
        phone: raw.phone ?? raw.phone_number ?? raw.phoneNumber ?? null,
        idNo: raw.idNo ?? raw.id_no ?? raw.id_number ?? null,
        accessToken: raw.accessToken ?? raw.access_token ?? null,
      };
      return normalized;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch profile"
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
  userId: string | null;
  firstName?: string | null;
  secondName?: string | null;
  emailAddr?: string | null;
  phone?: string | null;
  idNo?: string | null;
}

interface UserType {
  user: UserCredentials | null;
}

const user: UserCredentials = {
  userName: null,
  token: null,
  userId: null,
  firstName: null,
  secondName: null,
  emailAddr: null,
  phone: null,
  idNo: null,
};

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
        firstName: payload?.data?.firstName ?? payload?.firstName ?? null,
        secondName: payload?.data?.secondName ?? payload?.secondName ?? null,
        emailAddr: payload?.data?.emailAddr ?? payload?.emailAddr ?? null,
        phone: payload?.data?.phone ?? payload?.phone ?? null,
        idNo: payload?.data?.idNo ?? payload?.idNo ?? null,
        token: payload?.accessToken ?? payload?.data?.accessToken ?? getAccessToken() ?? null,
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {
        userName: null,
        token: null,
        userId: null,
        firstName: null,
        secondName: null,
        emailAddr: null,
        phone: null,
        idNo: null,
      };
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
        state.user = {
          userId: payload.userId ?? payload?.data?.userId ?? null,
          userName: payload.userName ?? payload?.data?.userName ?? null,
          firstName: payload.firstName ?? payload?.data?.firstName ?? null,
          secondName: payload.secondName ?? payload?.data?.secondName ?? null,
          emailAddr: payload.emailAddr ?? payload?.data?.emailAddr ?? null,
          phone: payload.phone ?? payload?.data?.phone ?? null,
          idNo: payload.idNo ?? payload?.data?.idNo ?? null,
          token: payload.accessToken ?? payload?.data?.accessToken ?? getAccessToken() ?? null,
        };
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
          userId: payload.userId ?? payload?.data?.userId ?? null,
          userName: payload.userName ?? payload?.data?.userName ?? null,
          firstName: payload.firstName ?? payload?.data?.firstName ?? null,
          secondName: payload.secondName ?? payload?.data?.secondName ?? null,
          emailAddr: payload.emailAddr ?? payload?.data?.emailAddr ?? null,
          phone: payload.phone ?? payload?.data?.phone ?? null,
          idNo: payload.idNo ?? payload?.data?.idNo ?? null,
          token: payload.accessToken ?? payload?.data?.accessToken ?? getAccessToken() ?? null,
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUPUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = {
          userId: payload.userId ?? state.user?.userId ?? null,
          userName: payload.userName ?? state.user?.userName ?? null,
          firstName: payload.firstName ?? state.user?.firstName ?? null,
          secondName: payload.secondName ?? state.user?.secondName ?? null,
          emailAddr: payload.emailAddr ?? state.user?.emailAddr ?? null,
          phone: payload.phone ?? state.user?.phone ?? null,
          idNo: payload.idNo ?? state.user?.idNo ?? null,
          token: state.user?.token ?? getAccessToken() ?? null,
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});


export const authSelector = (state: any) => state.auth;

export const { logout, setSession } = authSlice.actions;

export default authSlice.reducer;